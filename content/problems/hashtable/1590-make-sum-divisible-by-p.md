# 1590. Make Sum Divisible by P

## 題目資訊
- **Problem ID**: 1590
- **Title**: Make Sum Divisible by P
- **Difficulty**: Medium
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/make-sum-divisible-by-p
- **Topics**: Prefix Sum（前綴和）, Hash Map（雜湊表）, Modular Arithmetic（取餘數運算）

---

## 題目描述（中文整理）

給你一個正整數陣列 `nums`，以及一個正整數 `p`。

你可以**刪除一段連續子陣列（subarray）**，讓「剩下元素的總和」可以被 `p` 整除。  
規定：

- 子陣列可以為空（也就是可以不刪）。
- **不能**把整個陣列都刪掉。
- 回傳「最短」需要刪掉的 subarray 長度；如果做不到，回傳 `-1`。

---

## 解法 1：Prefix Sum + Hash Map（O(n)）

### 核心想法

1. 計算整個陣列總和 `S`，只關心 `S % p`：
   - 設 `rem = S % p`。
   - 如果 `rem == 0`，代表本來總和就可以被 `p` 整除，**不需要刪任何 subarray**，答案是 `0`。

2. 我們希望刪掉一段 subarray，使「剩下的總和」能被 `p` 整除：
   - 剩餘總和為 `S - sub`。
   - 條件：`(S - sub) % p == 0`。
   - 等價於：`sub % p == rem`。
   - 所以：**要找一段 subarray，它的和對 p 取餘數剛好是 `rem`**，而且長度要最短。

3. 用前綴和表達 subarray：
   - 定義 `prefix[j] = (nums[0] + nums[1] + ... + nums[j-1]) % p`，並令 `prefix[0] = 0`。
   - 對於 subarray `[i .. j-1]`，其總和：
     

     `sub(i, j) = prefix[j] - prefix[i]`（未取 mod）
     

     取餘數後：
     

     `sub(i, j) % p = (prefix[j] - prefix[i]) % p`。
   - 我們要：
     

     `(prefix[j] - prefix[i]) % p == rem`。

4. 將條件改寫成「要找哪個 prefix」：
   - `(prefix[j] - prefix[i]) % p == rem`
   - 等價於：`prefix[i] ≡ prefix[j] - rem (mod p)`。
   - 在程式中寫成：
     

     `need = (prefix[j] - rem + p) % p`（+p 避免負數，最後再 % p）。
   - 也就是說：**對每個 j，我們要找一個 i，使得 `prefix[i] == need`**。

5. 使用 `unordered_map<int, int>` 當作「餘數桶」：
   - `mp[r]`：紀錄「目前為止，前綴和餘數為 r 的**最新 index**」。
   - 一開始 `mp[0] = 0`，表示 `prefix[0] = 0` 在位置 0。
   - 掃描 `j = 1..n`：
     1. 更新 `prefix = (prefix + nums[j-1]) % p`，這是 `prefix[j]`。
     2. 算出我們需要的餘數：`need = (prefix - rem + p) % p`。
     3. 如果 `need` 在 `mp` 中：
        - 取 `i = mp[need]`。
        - subarray 長度為 `j - i`（對應到 `[i .. j-1]`）。
        - 更新 `ans = min(ans, j - i)`。
     4. 最後更新 `mp[prefix] = j`，記下「這個餘數最新出現的位置」。

6. 不能刪掉整個陣列：
   - 理論上最大可能的 subarray 長度是 `n`（從 0 刪到 n-1）。
   - 但題目禁止刪掉整個陣列，所以：
     - 初始 `ans = n`。
     - 結束後如果 `ans == n`，代表只能刪整個陣列或根本沒合適的 subarray ⇒ 回傳 `-1`。
     - 否則回傳 `ans`。

### 正確性直覺

- `rem` 固定代表「需要被補掉」的餘數。
- 每次走到 `j`，`prefix[j]` 代表前 `j` 個元素的總和餘數。
- 找到 `i` 使得 `prefix[i]` = `need`，就保證 `[i .. j-1]` 這段 subarray 的和 % p = rem，刪掉它就可以讓剩餘和被 p 整除。
- 為了拿到**最短長度**，對每個餘數，我們永遠保存「最新的 index」，讓之後的 `j` 減出來的 `j - i` 盡可能小。

---

## 複雜度分析

- **時間複雜度**：  
  - 單次遍歷陣列，對每個 `j` 做 O(1) 的 hash 查詢與更新。  
  - 整體為 **O(n)**。
- **空間複雜度**：  
  - `unordered_map` 最多存 O(n) 種不同餘數。  
  - 整體為 **O(n)**。

---

## 參考程式碼（C++，可直接提交）

> 說明：這份程式碼對應上面的解法，採用 prefix + hash map，並處理了「不能刪整個陣列」與 long long 溢位等細節。

```cpp
class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {
        int n = nums.size();

        // 先計算整體總和的餘數 rem
        long long total = 0;
        for (int x : nums) {
            total = (total + x) % p;
        }
        int rem = (int)(total % p);
        if (rem == 0) return 0;   // 不用刪任何 subarray

        // mp[餘數] = 對應 prefix 的最新 index（prefix 的定義是前 j 個元素）
        unordered_map<int,int> mp;
        mp[0] = 0;                // prefix[0] = 0，在位置 0（還沒用任何元素）

        int ans = n;              // 最壞情況：刪整個陣列（不合法）
        int prefix = 0;           // 目前的 prefix[j]

        // j 從 1 跑到 n，表示 prefix 長度（用掉 nums[0..j-1]）
        for (int j = 1; j <= n; ++j) {
            prefix = (prefix + nums[j - 1]) % p;     // 算出 prefix[j]

            // 想找一個 i < j，讓 (prefix[j] - prefix[i]) % p == rem
            // => prefix[i] == (prefix[j] - rem + p) % p
            int need = (prefix - rem + p) % p;

            auto it = mp.find(need);
            if (it != mp.end()) {
                int i = it->second;
                ans = min(ans, j - i);  // subarray 長度 = j - i（對應 [i .. j-1]）
            }

            // 為了讓未來的 j 可以拿到「最短長度」，更新此餘數的最新 index
            mp[prefix] = j;
        }

        // 不能刪掉整個陣列；如果最小長度還是 n，就代表沒辦法
        if (ans == n) return -1;
        return ans;
    }
};
```

---

## 個人筆記 & 心得

- 一開始如果暴力枚舉所有 subarray，時間複雜度會是 O(n²)，在 n 到 1e5 一定 TLE。
- 關鍵轉折是把條件 `(S - sub) % p == 0` 改寫成 `sub % p == rem`，再用 prefix 差值來表達 subarray。
- 記住這個常用模板：
  - 想找「最短 subarray，使 subarray 的和對某個 p 取餘數等於固定值」，  
    幾乎都可以用「prefix + hash（餘數桶）」來做。
- 注意細節：
  - 不能刪掉整個陣列 ⇒ 用 `ans == n` 來判斷失敗。
  - 計算 `need` 時要寫 `(prefix - rem + p) % p` 避免負數。
  - 總和可能很大，所以 total 先用 `long long`，再 `% p`。

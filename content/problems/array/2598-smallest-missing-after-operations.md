---
title: "2598. Smallest Missing Non-negative Integer After Operations"
problemId: 2598
difficulty: Medium
source: LeetCode
topics: Array, Hash Table, Math
---

# 2598. Smallest Missing Non-negative Integer After Operations — 筆記（最大化 MEX）

> **題意摘要**
> 給定整數陣列 `nums` 與整數 `value`。一次操作可對任一元素加上或減去 `value`（可無限次）。
> **MEX** 定義為陣列中**最小**的**未出現**之**非負整數**。目標：經過任意多次操作後，回傳**最大可能的 MEX**。

## 1) 核心觀念（餘數分桶）

- 對任意整數 `x`，若重複加/減 `value`，其 **mod `value` 的餘數**不變（`x ≡ x ± k*value (mod value)`）。  
- 因此每個數只能落在**固定的餘數類**上。令 `r = ((x % value) + value) % value` 將餘數規範到 `[0, value-1]`。  
- 把 `nums` 依餘數 `r` 分桶，數量記為 `cnt[r]`。接著我們從 `x = 0` 開始**依序填滿** `0,1,2,3,...`：
  - 需要填 `x` 時，必須從 **餘數類 `r = x % value`** 取出一個數來「對齊」到 `x`（藉由加減 `value`）。
  - 若 `cnt[r] > 0`，則能填 `x`，並做 `cnt[r]--`，繼續 `x+1`。  
  - 若 `cnt[r] == 0`，代表**無法填 `x`**，因此當前 `x` 即為最大可達的 **MEX**。

> 直觀理解：每個餘數桶供應該桶索引（`r`）對應的序列位置 `r, r+value, r+2*value, ...`。當某桶用完，該序列上的下一個位置就無法被填上。

---

## 2) 你的原本想法 vs. 修正點

- 你原本的想法：「只要每個餘數類都出現過一次，MEX 就會是第一個未出現的餘數索引」——**錯在忽略供應需要持續扣用**。  
- 因為填 `0,1,2,3,...` 時，**同一餘數類會被反覆使用**（對應 `x = r, r+value, r+2*value, ...`）。  
- 正確做法：**每填一個 `x` 就把 `cnt[x % value]--`**；當某次遇到 `cnt[x % value] == 0` 時，**立刻回傳 `x`**。

---

## 3) 正確性草證

- 對每個 `x`，只有 `x % value` 這個餘數類能供應它。  
- 若該桶還有存量，就能把某個原始屬於這個餘數類的數經由加/減 `value` 移到 `x`；否則無法填。  
- 自小到大貪心填充，一旦遇到某個 `x` 無法填，**更大的數更不可能先被填**，因此此時的 `x` 即為最大可達 MEX。

---

## 4) 演算法步驟（O(n)）

1. 計數各餘數類：`r = ((num % value) + value) % value`，`cnt[r]++`。  
2. 令 `x = 0`，循環：
   - `r = x % value`；若 `cnt[r] > 0` → `cnt[r]--` 並 `x++`；否則回傳 `x`。

**時間複雜度**：`O(n)`（計數一次 + 線性遞增 `x` 至 MEX）  
**空間複雜度**：`O(value)`（餘數桶）

---

## 5) 你的 C++ 程式（修正版，保留原風格）

```cpp
class Solution {
public:
    int findSmallestInteger(vector<int>& nums, int value) {
        int n = (int)nums.size();
        vector<int> cnt(value, 0);

        // 將負數餘數規範到 [0, value-1]
        for (int i = 0; i < n; ++i) {
            int r = ((nums[i] % value) + value) % value;
            cnt[r]++;
        }

        int x = 0;
        while (true) {
            int r = x % value;
            if (cnt[r] > 0) {
                cnt[r]--;
                ++x;
            } else {
                return x; // 第一個無法被對齊的 x，即最大 MEX
            }
        }
    }
};
```

> 註：`vector<int> mo(n, 0);` 在最終解法中可省略（除非你要保留中間餘數紀錄）。

---

## 6) 常見坑點

- **負數取餘**：務必用 `((num % value) + value) % value`。  
- **誤把「是否出現過」當成判準**：不是只看是否出現一次，而是需要**重複消耗**。  
- **溢位/邏輯**：`x` 會逐步增加，但不可能超過 `n + value` 太多（因為每步都要消耗一個桶、最多消耗 `n` 次）。

---

## 7) 範例驗證

- `nums = [1,-10,7,13,6,8], value = 5`  
  - 餘數（mod 5）：`[1, 0, 2, 3, 1, 3]` → `cnt = [1,2,1,2,0]`  
  - 填 `x=0`：要 `r=0` → `cnt[0]=1→0`  
  - 填 `x=1`：要 `r=1` → `cnt[1]=2→1`  
  - 填 `x=2`：要 `r=2` → `cnt[2]=1→0`  
  - 填 `x=3`：要 `r=3` → `cnt[3]=2→1`  
  - 填 `x=4`：要 `r=4` → `cnt[4]=0` → 卡住，因此 **MEX=4**（與題解一致）。

---

### 一句話總結
把數字按餘數分桶；從 0 起依序填滿 `x`，每次消耗 `cnt[x % value]`。遇到空桶即回傳當前 `x`，就是最大化後的 MEX。

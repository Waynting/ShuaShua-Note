---
title: "3350. Adjacent Increasing Subarrays Detection II"
problemId: 3350
difficulty: Medium
source: LeetCode
topics: Array, Greedy, Sliding Window
---

# 3350. Adjacent Increasing Subarrays Detection II — 筆記（O(n) 解法）

> **主旨**：找出最大 `k`，使得存在兩段**相鄰**、各長度為 `k` 的子陣列，且兩段都**嚴格遞增**。相鄰表示右段起點 `b = a + k`。

## 1. 關鍵觀念

- 定義兩個輔助陣列：
  - `L[i]`：**以 `i` 結尾** 的嚴格遞增連續段長度。
  - `R[i]`：**以 `i` 開頭** 的嚴格遞增連續段長度。

- 對於每個分界（邊界） `i | i+1`：
  - 左段最多能取到的長度受 `L[i]` 限制。
  - 右段最多能取到的長度受 `R[i+1]` 限制。
  - 兩段都要長度 ≥ `k`，因此該分界能達到的 **最大 `k` = `min(L[i], R[i+1])`**。

- 最終答案：
  \[
  \text{ans} = \max_{i=0}^{n-2} \; \min\big(L[i], R[i+1]\big).
  \]

---

## 2. 為什麼可行？（直覺）

- `L[i] = x` 表示左邊在 `i` 結尾至少可以向左延伸 `x` 長度的嚴格遞增段；`R[i+1] = y` 表示右邊在 `i+1` 開頭至少可以向右延伸 `y` 長度。
- 兩段要同時長度為 `k`，就被較短的那一段限制，因此分界 `i` 的可行長度上限是 `min(x, y)`。
- 在所有分界中取最大值，即為題目要求的最大 `k`。

---

## 3. 建表方式（O(n) 線性掃描）

- **建 `L`**（遞增段以 `i` 結尾）：
  - 初值 `L[0] = 1`；
  - 若 `nums[i-1] < nums[i]`，則 `L[i] = L[i-1] + 1`；否則重置為 `1`。

- **建 `R`**（遞增段以 `i` 開頭）：
  - 初值 `R[n-1] = 1`；
  - 自右向左：若 `nums[i] < nums[i+1]`，則 `R[i] = R[i+1] + 1`；否則重置為 `1`。

- **統合答案**：掃過 `i = 0..n-2`，對每個分界取 `min(L[i], R[i+1])` 的最大值。

---

## 4. 極簡偽碼（語言無關）

```text
build L:
  L[0] = 1
  for i = 1..n-1:
    if nums[i-1] < nums[i]: L[i] = L[i-1] + 1
    else:                   L[i] = 1

build R:
  R[n-1] = 1
  for i = n-2..0:
    if nums[i] < nums[i+1]: R[i] = R[i+1] + 1
    else:                   R[i] = 1

ans = 0
for i = 0..n-2:  # 分界在 i | i+1
  ans = max(ans, min(L[i], R[i+1]))

return ans
```

---

## 5. 參考 C++17 實作（O(n) 時間 / O(n) 空間）

> 若你只想看重點：`L` 與 `R` 兩趟線掃，最後掃一次分界取 `min` 的最大值。

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxIncreasingSubarrays(vector<int>& nums) {
        int n = (int)nums.size();
        if (n < 2) return 0;

        vector<int> L(n, 1), R(n, 1);

        // L[i]: length of strictly increasing run ending at i
        for (int i = 1; i < n; ++i) {
            if (nums[i - 1] < nums[i]) L[i] = L[i - 1] + 1;
        }
        // R[i]: length of strictly increasing run starting at i
        for (int i = n - 2; i >= 0; --i) {
            if (nums[i] < nums[i + 1]) R[i] = R[i + 1] + 1;
        }

        int ans = 0;
        for (int i = 0; i + 1 < n; ++i) {
            // 分界在 i 與 i+1 之間
            ans = max(ans, min(L[i], R[i + 1]));
        }
        return ans;
    }
};
```

**時間複雜度**：`O(n)`（三次線性掃描）  
**空間複雜度**：`O(n)`（儲存 `L` 與 `R`）

---

## 6. 注意事項（常見坑）

- **嚴格遞增**：比較必須用 `<`，不能用 `<=`。
- **分界範圍**：只需考慮 `i = 0..n-2`，因為分界在 `i | i+1`。
- **邊界長度**：`n < 2` 直接回傳 `0`（無法形成兩段）。
- **Off-by-one**：組合答案時別寫成 `min(L[i], R[i])`，右段應從 `i+1` 開始。

---

## 7. 小範例（手算感）

- `nums = [1, 2, 3, 1, 2, 3, 4]`  
  - 遞增段：`[1,2,3]`、`[1,2,3,4]`  
  - 分界在索引 `2 | 3`：`L[2] = 3`、`R[3] = 4` → 這個分界的最大 `k = min(3,4) = 3`。  
  - 其他分界可能更小，整體答案為 `3`。

---

## 8. 延伸思考（Binary Search on Answer）

- 也能用「答案二分」：定義可行性 `F(k)` 是否存在某分界使 `L[i] ≥ k` 且 `R[i+1] ≥ k`。  
- `F(k)` 具 **單調性**（`k` 越小越容易成立），可二分最大可行 `k`。  
- 本題因為有更簡潔的 `O(n)` 直接做法，二分不是必要但可作為模板練習。

---

**一句話總結**：先線性建出每點左/右的嚴格遞增連續段長度，然後在每個分界取兩側長度的 `min`，全域取 `max` 即得最大相鄰嚴格遞增子陣列長度 `k`。

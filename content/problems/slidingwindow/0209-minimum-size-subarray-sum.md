---
title: "LeetCode 209 — Minimum Size Subarray Sum"
problemId: 0209
slug: minimum-size-subarray-sum
tags: [sliding-window, two-pointers, array]
language: C++17
---

# 209. Minimum Size Subarray Sum — 題目筆記（Sliding Window）

> **筆記重點**：這題是「**全為正數**」→ **滑動視窗**的經典題。利用兩個指標維持區間 `[l, r]`，右指標擴張、左指標在總和達標時盡量收縮以取得最短長度。

---

## 題目重述
給定正整數 `target` 與正整數陣列 `nums`，找出**最短**長度的連續子陣列，使其元素總和 `≥ target`；若不存在回傳 `0`。

- 輸入：`target ∈ ℕ⁺`，`nums[i] ∈ ℕ⁺`
- 輸出：最短長度（或 `0`）

**解題訊號**：元素全為正 → 子陣列和對右指標單調不減 → **Sliding Window** 可在線性時間完成。

---

## 核心想法（Sliding Window）
1. 維持視窗和 `win` 與左端 `l`。右端 `r` 從左至右掃描：`win += nums[r]`。
2. 只要 `win ≥ target`，就嘗試**收縮左端**（`while`），每次都更新最短長度並移除 `nums[l]`、左端右移。
3. 掃完後，若從未達標，回傳 `0`。

**為什麼要 `while` 而不是 `if`？**  
因為在同一個 `r` 下，可能可以向右縮 `l` 多步而仍滿足 `win ≥ target`，每縮一步都有機會得到更短答案。

---

## 不變量與邊界
- **不變量**：每輪內層 `while` 結束時，`win < target` 或 `l` 已經收縮到不能再小。
- **邊界**：
  - 若 `nums` 為空或所有元素總和 < `target` → 回傳 `0`。
  - 使用 `INT_MAX` 作為答案初值；若資料範圍大，`win` 建議使用 `long long` 以避免溢位。
- **複雜度**：時間 `O(n)`；空間 `O(1)`。每個索引最多被 `l`/`r` 走過一次。

---

## 語言無關偽碼（骨架）
> 僅保留結構與重點步驟，避免成為可直接提交的完整程式。

```
function minSubArrayLen(target, nums):
    n = length(nums)
    ans = +INF
    win = 0
    l = 0

    for r from 0 to n-1:
        win += nums[r]
        while win >= target:
            ans = min(ans, r - l + 1)
            win -= nums[l]
            l += 1

    if ans == +INF: return 0
    else: return ans
```

---

## 你的解答（Snapshot）
> 這段為你剛剛提供的 C++ 程式，用來對照筆記重點。

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        
        //sliding windows
        int n = nums.size();
        int win = 0, ans = INT32_MAX;
        int winlength = 0;
        int l = 0;
        for(int i = 0; i < n ; ++i ){
            win += nums[i];
            while(win >= target){
                winlength = i - l +1;
                if(ans > winlength){
                    ans = winlength;
                }
                win -= nums[l];
                l++;
            }
        }
        if(ans == INT32_MAX){
            return 0;
        }
        return ans;
    }
};
```

### 極小幅建議（不改邏輯，只強化健壯性）
- `ans` 改用 `INT_MAX`（記得 `#include <climits>`），以符合常見慣例。  
- 若測資上限較大，`win` 可改 `long long` 避免溢位。  
- 可省略 `winlength`，直接 `ans = min(ans, i - l + 1)`。

---

## 常見陷阱（Checklist）
- ✅ 內層用 **`while (win >= target)`**，避免錯過更短長度。  
- ✅ 不要提早 `return`，要掃完整個陣列並在每次可縮時更新最短解。  
- ✅ 注意空陣列、無法達標時回傳 `0`。  
- ✅ 大數據下的加總溢位（使用 `long long`）。

---

## 自測案例
- `target=7, nums=[2,3,1,2,4,3]` → `2`（最短 `[4,3]`）  
- `target=4, nums=[1,4,4]` → `1`  
- `target=11, nums=[1,1,1,1,1,1,1,1]` → `0`  
- 邊界：`target=3, nums=[3]` → `1`；`target=5, nums=[6]` → `1`；`target=5, nums=[1,2]` → `0`

---

## 變體思考
- 若允許**負數**：滑動視窗的單調性破壞，通常改以前綴和＋平衡結構或其他技巧（例如單調佇列、二分等）依條件處理。
- **前綴和＋二分**：亦可做本題（`O(n log n)`），但在本題的全正數設定下，滑動視窗 `O(n)` 更優雅。

---

## 你可以練習的微調
1. 把 `win` 換 `long long`，移除 `winlength`，改為一行 `ans = min(ans, i - l + 1)`。
2. 新增測資：`target=15, nums=[5,1,3,5,10,7,4,9,2,8]`，手算與程式比對。
3. 思考：為何把 `while` 換 `if` 就可能錯過解？試舉例子。

---

> 筆記作者備註：  
> 這題是「滑動視窗」在正整數陣列中的經典範式，解題重點是掌握「擴張右端、達標即收縮左端」的節奏與不變量。

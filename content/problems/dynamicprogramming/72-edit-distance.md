---
title: "72. Edit Distance"
problemId: 72
difficulty: Medium
source: LeetCode
topics: Dynamic Programming, String
---

# LeetCode 72 — Edit Distance：解題筆記（1D DP 版本）

> 目標：把 `word1` 轉成 `word2` 的最少操作數。允許 **插入、刪除、取代**，成本皆為 1。
> 方法：Levenshtein 距離的動態規劃，使用 **一維滾動陣列** 降空間。

## 1) DP 思路

- 狀態：`C[i][j]` = 將 `word1[0..i-1]` 轉成 `word2[0..j-1]` 的最小成本
- 邊界：
  - `C[0][j] = j`  （空→B 前綴：插 j 次）
  - `C[i][0] = i`  （A 前綴→空：刪 i 次）
- 轉移：令 `a = word1[i-1]`, `b = word2[j-1]`, `cost = (a==b ? 0 : 1)`
  
  C[i][j] = min(
    C[i-1][j]   + 1,      // 刪 a          ↑
    C[i][j-1]   + 1,      // 插 b          ←
    C[i-1][j-1] + cost    // 配對/取代     ↖
  )

- 時間：`O(nm)`，空間可壓到 `O(m)`（m = |word2|）

---

## 2) 一維滾動陣列（重點）

內層 `j` 從左到右更新：

- 上 (↑)  = 舊 `dp[j]`               → 刪除
- 左 (←)  = 新 `dp[j-1]`（剛更新）   → 插入
- 左上 (↖)= 變數 `prev`（上一輪的 `dp[j-1]`）→ 配對/取代

更新骨架：
```
tmp = dp[j]                            // 上(舊)
dp[j] = min(dp[j] + 1,                 // 刪
            dp[j-1] + 1,               // 插
            prev + cost)               // 配/換
prev = tmp                             // 左上右移
```

---

## 3) 可提交程式（C++，O(m) 空間）

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.length(), m = word2.length();
        vector<int> dp(m + 1);
        for (int j = 0; j <= m; ++j) dp[j] = j;     // C[0][j]

        for (int i = 1; i <= n; ++i) {
            int prev = dp[0];                       // 舊 C[i-1][0]
            dp[0] = i;                              // 新 C[i][0]
            for (int j = 1; j <= m; ++j) {
                int tmp  = dp[j];                   // 舊 C[i-1][j] (上)
                int cost = (word1[i-1] == word2[j-1]) ? 0 : 1;
                dp[j] = min({ dp[j] + 1,            // 刪
                              dp[j-1] + 1,          // 插
                              prev + cost });       // 配/換
                prev = tmp;                         // 左上 → 下一格
            }
        }
        return dp[m];
    }
};
```

---

## 4) 「為什麼一維可行？」（直覺圖）

更新 `C[i][j]` 畫面：
```
上一行:  ...  C[i-1][j-1](prev)   C[i-1][j](舊dp[j]) ...
本  行:  ...  C[i][j-1](新dp[j-1])   C[i][j](dp[j] 將被覆寫)
```
- 左 = 新 `dp[j-1]`（已是本行）
- 上 = 舊 `dp[j]`（仍是上一行）
- 左上 = `prev`（用變數保存）

---

## 5) 小例（關鍵格）：`C[4,5]`

若 `word1="bbaaa"`, `word2="bbbaba"`，且 `word1[3]='a'`, `word2[4]='b'` 不同：
```
C[4,5] = min(
  C[3,5] + 1,   // 刪
  C[4,4] + 1,   // 插
  C[3,4] + 1    // 換
) = 2
```

---

## 6) 常見坑 & 加分
- 只 `reserve` 不 `resize` → 不能用 `dp[i]=...`；要 `vector<int> dp(m+1);`
- 內層一定 **左→右** 更新，確保 `dp[j-1]` 是本行值
- 若要更省空間，令 `m = min(|A|, |B|)` 並確保用較短者當列長

---

## 7) 變體
- **加權編輯距離**：三種操作成本不同（把 `+1` 改成對應權重）
- **Damerau–Levenshtein**：加「相鄰交換」；轉移要看左下對角
- **回溯重建操作序列**：需保留 2D parent 或改用 2D DP

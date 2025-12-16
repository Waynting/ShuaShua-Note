# 5. Longest Palindromic Substring — 筆記（DP 版本）

## 0. 問題資訊
- **Problem ID**: 5  
- **Title**: Longest Palindromic Substring  
- **Difficulty**: Medium  
- **Link**: https://leetcode.com/problems/longest-palindromic-substring/  
- **Tags**: DP, String  

---

## 1. 題目重述（中文）
給一個字串 `s`，回傳 **最長的回文子字串**（substring，必須連續）。

---

## 2. DP 解法核心概念（中文）
定義一個 DP table：

```
P[i][j] = 子字串 s[i..j] 是否為回文
```

### 初始條件
1. **單一字元一定是回文：**
```
P[i][i] = true
```
2. **長度為 2：**
```
P[i][i+1] = (s[i] == s[i+1])
```

### 遞迴轉移（長度 ≥ 3）
一段 s[i..j] 是回文 **iff：**
```
s[i] == s[j]  AND  P[i+1][j-1] == true
```

### 最終答案
遍歷所有 `(i, j)` 找：
```
max length = j - i + 1
且 P[i][j] == true
```

---

## 3. DP 數學描述（整理版）
### 狀態
\[
P[i][j] = 
\begin{cases}
true & \text{if } s[i..j] \text{ is palindrome} \\
false & \text{otherwise}
\end{cases}
\]

### 初始條件
\[
P[i][i] = true
\]

\[
P[i][i+1] = (s[i] = s[i+1])
\]

### 遞迴（長度 ≥ 3）
\[
P[i][j] = (s[i] = s[j]) \land P[i+1][j-1], \quad \text{for } j - i \ge 2
\]

### 最長回文長度
\[
L^* = \max \{ j - i + 1 \mid P[i][j] = true \}
\]

### 所有最長回文位置集合
\[
\{ (i, j) \mid P[i][j] = true,\ j - i + 1 = L^* \}
\]

---

## 4. 語言無關偽碼（不可提交）

```
initialize P[n][n] = false
for i in 0..n-1:
    P[i][i] = true
    record answer length = 1

for len = 2..n:
    for i in 0..n-len:
        j = i + len - 1
        if s[i] == s[j]:
            if len == 2:
                P[i][j] = true
            else:
                P[i][j] = P[i+1][j-1]
        if P[i][j] == true:
            update best answer
```

---

## 5. 時間與空間複雜度
- **時間複雜度**：O(n²)  
- **空間複雜度**：O(n²)

---

## 6. 個人筆記（中文）
- 用 DP 做 longest palindromic substring 記得順序：從短 → 長。
- 轉移關鍵：最外層兩個字要相等，內層 dp[i+1][j-1] 必須是回文。
- 最容易錯：`substr(i, length)` 要用長度，不是右邊界 index。

---


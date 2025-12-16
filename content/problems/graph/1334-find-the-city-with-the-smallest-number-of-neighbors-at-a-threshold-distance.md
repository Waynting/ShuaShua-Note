---
title: "1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance"
problemId: 1334
difficulty: Medium
source: LeetCode
topics: Graph, Shortest Path
---

# 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance

## 題目描述（中文重點）

有 `n` 個城市（編號 `0 ~ n-1`），給定一個邊陣列 `edges`：

- `edges[i] = [from_i, to_i, weight_i]` 代表城市 `from_i` 與城市 `to_i` 之間有一條 **雙向、帶權重** 的邊，距離為 `weight_i`。
- 再給一個整數 `distanceThreshold`。

定義：

> 對於城市 `i`，若存在一條路徑從 `i` 到 `j`，且最短路徑距離 `dist(i, j) <= distanceThreshold`，則稱城市 `j` 在 `i` 的「可達集合」裡。

題目要回傳：

- 使得「可達城市數量」**最少**的那個城市編號。
- 若有多個城市的可達數量相同，取 **編號最大** 的那一個。

---

## 解題核心觀念

### 1. 這題本質：**全點對最短路徑（APSP）**

因為：

- 我們需要知道「每一個城市 `i` 到其它所有城市 `j` 的最短距離」。
- `n` 的上限為 100（查約略限制），用 Floyd–Warshall 的時間複雜度 `O(n^3)` 是完全可以接受的：

\[
O(n^3) = O(100^3) = 10^6 \text{ 級別}
\]

因此這題很適合作為 Floyd–Warshall 的練習。

---

### 2. Floyd–Warshall 的基本流程

1. 用一個 `dist[n][n]` 的矩陣，初始化為：
   - `dist[i][i] = 0`
   - 若 `i` 與 `j` 有邊，`dist[i][j] = weight(i, j)`（雙向圖也要設 `dist[j][i]`）
   - 其他沒有邊的地方設為「無限大」（例如 `INF = numeric_limits<int>::max()`）

2. 三重迴圈（中間點 k，起點 i，終點 j）：

\[
dist[i][j] = \min(dist[i][j],\ dist[i][k] + dist[k][j])
\]

程式上寫成：

```cpp
for (int k = 0; k < n; ++k) {
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            if (dist[i][k] != INF && dist[k][j] != INF) {
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
}
```

注意：

- 先檢查 `dist[i][k]` 和 `dist[k][j]` 不為 INF，才進行加法，避免溢位或無意義操作。
- 做完後，`dist[i][j]` 就是從 `i` 到 `j` 的 **最短路徑距離**（若仍為 INF 代表完全不可達）。

---

### 3. 算出每個城市的「可達數量」

在得到 `dist` 矩陣之後，對每個城市 `i`：

- 計算有多少 `j` 滿足 `dist[i][j] <= distanceThreshold`。
- 根據題目定義，`i == j` 且距離為 0 時也會被算進去（自我可達），  
  但因為每個城市對自己距離都是 0，所以「有沒有把自己算進去」不影響最後誰最小、誰最大，只是所有人的計數都 +1。

遍歷方式：

```cpp
int minCity = INT_MAX;
int bestCity = -1;

for (int i = 0; i < n; ++i) {
    int reachable = 0;
    for (int j = 0; j < n; ++j) {
        if (dist[i][j] <= distanceThreshold) {
            ++reachable;
        }
    }

    // 若可達數量更小，或相同但城市編號更大，更新答案
    if (reachable <= minCity) {
        minCity = reachable;
        bestCity = i;
    }
}
```

這裡條件寫 `<=`，確保在「可達數量相同」時會選編號較大的城市。

---

## C++ 解法程式碼（Floyd–Warshall）

```cpp
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        // 1. 初始化距離矩陣為「無限大」
        const int INF = numeric_limits<int>::max();
        vector<vector<int>> dist(n, vector<int>(n, INF));

        // 2. 自己到自己距離為 0
        for (int i = 0; i < n; ++i) {
            dist[i][i] = 0;
        }

        // 3. 根據 edges 填入圖的邊（無向圖）
        for (const auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            dist[u][v] = min(dist[u][v], w); // 若有重邊可用 min（保險）
            dist[v][u] = min(dist[v][u], w);
        }

        // 4. Floyd–Warshall：枚舉中繼點 k，起點 i，終點 j
        for (int k = 0; k < n; ++k) {
            for (int i = 0; i < n; ++i) {
                if (dist[i][k] == INF) continue; // 這一層的剪枝可省但略微加速
                for (int j = 0; j < n; ++j) {
                    if (dist[k][j] == INF) continue;
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        // 5. 找出可達城市數最少的城市（同數量時取編號較大者）
        int minCity = INT_MAX;
        int bestCity = -1;

        for (int i = 0; i < n; ++i) {
            int reachable = 0;
            for (int j = 0; j < n; ++j) {
                if (dist[i][j] <= distanceThreshold) {
                    ++reachable;
                }
            }

            // 若更小，或同樣小但 i 較大，就更新
            if (reachable <= minCity) {
                minCity = reachable;
                bestCity = i;
            }
        }

        return bestCity;
    }
};
```

---

## 複雜度分析

- `dist` 矩陣為 `n x n`，初始化 `O(n^2)`。
- Floyd–Warshall 三重迴圈：`O(n^3)`。
- 最後計數部分：`O(n^2)`。

整體主要瓶頸：

- **時間複雜度**：\(O(n^3)\)
- **空間複雜度**：\(O(n^2)\)

對於 `n <= 100` 的限制，這是可接受且常見的解法。

---

## 個人筆記 / 反思

- 這題一開始看到「每個城市到其他城市的最短距離」時，很自然會想到：
  - 對每個節點跑一次 Dijkstra（`O(n * (m log n))`）  
  - 或直接用 Floyd–Warshall（`O(n^3)`）。
- 因為 `n` 不大（約 100 級），所以 Floyd–Warshall 的實作反而更簡潔、好寫。
- 需要注意的幾個小細節：
  1. **距離初始化**：  
     - 自己到自己是 `0`  
     - 沒有邊要設為 `INF`（用 `numeric_limits<int>::max()`）
  2. **更新條件**：  
     - 只有當 `dist[i][k]` 和 `dist[k][j]` 都不是 `INF` 時，才進行 `+` 和 `min`。
  3. **答案 tie-breaking**：  
     - 這題要求「可達城市數最少」  
     - 當數量相同時選 **城市編號較大**，所以 if 條件用 `<=`。
- 心得：  
  - 這題是很標準的 Floyd–Warshall 應用題，  
  - 也是練習「從 APSP → 進一步做某種統計（可達點數量）」的典型例子。  
  - 實作上只要框架記熟，之後看到類似「小 n + 所有點對最短路徑」的題目，就可以直接套用了。

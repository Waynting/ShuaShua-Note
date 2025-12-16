---
title: Connected Component（連通分量）
author: 你（整理：ChatGPT）
tags: [Graph, BFS, DFS, Connected Components, Tarjan, SCC, 2-SAT]
date: 2025-11-28
---

> **來源**：[演算法筆記 - Connected Component](https://web.ntnu.edu.tw/~algo/ConnectedComponent.html)
> **核心觀念**：當圖上有環，難以設計有效率的演算法。收縮所有的環，讓圖變成樹、有向無環圖，就容易解決問題了！

---

## 一、Connected Component（連通分量）

![Connected Component 示意圖](https://web.ntnu.edu.tw/~algo/ConnectedComponent1.png)

### 定義

當一張**無向圖不連通**、分隔成幾個區塊的時候，每一個區塊都是一個「連通分量」。

### 特性

- **無法互相重疊**
- 指在連通情況下**點數最多、擴展範圍最大**的子圖
- 利用 **Graph Traversal（BFS/DFS）** 可找到所有連通分量

### 求法

```
for v in 1..N:
    if v not visited:
        # 以 v 為新分量起點
        run BFS/DFS from v
        # 這一輪走訪到的所有點，構成一個連通分量
```

### 相關題目

- UVa 459、10765

---

## 二、Biconnected Component（雙連通分量，BCC）

![Biconnected Component 示意圖](https://web.ntnu.edu.tw/~algo/ConnectedComponent2.png)

### 定義

不會產生**關節點（Articulation Point）** 的連通分量，稱作「雙連通分量」。

### 特性

- 通常**互相重疊**，重疊部分為原圖的**關節點**
- 收縮後形成 **Block-Cutvertex Tree** 結構

### 關節點

- 移除該點後，圖會變成不連通
- BCC 之間的交點就是關節點

---

## 三、Bridge-Connected Component（橋連通分量）

![Bridge-Connected Component 示意圖](https://web.ntnu.edu.tw/~algo/ConnectedComponent3.png)

### 定義

不會產生**橋（Bridge）** 的連通分量，稱作「橋連通分量」。

### 特性

- 一個橋連通分量，是由**很多環交疊**而成的
- 橋：移除該邊後，圖會變成不連通

### 相關題目

- ICPC 5135、4839、7605

---

## 四、Strongly Connected Component（強連通分量，SCC）

![Strongly Connected Component 示意圖](https://web.ntnu.edu.tw/~algo/ConnectedComponent4.png)

### 定義

在**有向圖**中，所有兩點之間，**雙向皆有路可通**的連通分量。

### 特性

- **無法互相重疊**
- 由多個**有向環交疊**而成
- 收縮後形成 **DAG（有向無環圖）**

### 相關題目

- UVa 11504、11709、11770、11838

---

## 五、Weakly Connected Component（弱連通分量）

### 定義

在有向圖中，所有兩點之間，**至少單向有路可通**的連通分量。

### 特性

- 通常**互相重疊**
- 比 SCC 條件寬鬆

### 相關題目

- UVa 11324

---

## 六、Tarjan's Algorithm

Tarjan 演算法可用於找出各種連通分量，核心思想是利用 DFS 配合時間戳記。

### 無向圖：找 BCC 並收縮環

![Tarjan 無向圖示意](https://web.ntnu.edu.tw/~algo/ConnectedComponent5.png)

**核心概念**：
- `visit[i]`：節點 i 的訪問時間戳
- `low[i]`：節點 i 能到達的最小時間戳（最高祖先）
- 使用 **stack** 追蹤當前 BCC 的節點

**偽碼骨架**：

```cpp
void DFS(int i, int p) {   // p = parent
    visit[i] = low[i] = ++t;
    stack[top++] = i;

    for (int j : adj[i]) {
        if (!visit[j]) {
            DFS(j, i);
        }
        // 避免走回父親那條邊（處理重邊情況）
        if (!(j == p && adj[i][j] == 1)) {
            low[i] = min(low[i], low[j]);
        }
    }

    // 如果 i 是一個 BCC 的根
    if (visit[i] == low[i]) {
        int j;
        do {
            j = stack[--top];
            contract[j] = i;  // 收縮到代表點
        } while (i != j);
    }
}
```

### 有向圖：找 SCC

![Tarjan 有向圖示意](https://web.ntnu.edu.tw/~algo/ConnectedComponent6.png)

**與無向圖的關鍵差異**：
- 需要額外的 `instack[]` 陣列追蹤**尚未形成 SCC** 的節點
- forward edge / cross edge 連到**已移出 stack** 的 SCC 時，不計入 `low` 值

**偽碼骨架**：

```cpp
void DFS(int i) {
    visit[i] = low[i] = ++t;
    stack[top++] = i;
    instack[i] = true;

    for (int j : adj[i]) {
        if (!visit[j]) {
            DFS(j);
        }
        // 只有還在 stack 中的節點才計入
        if (instack[j]) {
            low[i] = min(low[i], low[j]);
        }
    }

    // 如果 i 是一個 SCC 的根
    if (visit[i] == low[i]) {
        int j;
        do {
            j = stack[--top];
            instack[j] = false;
            contract[j] = i;
        } while (j != i);
    }
}
```

### 時間複雜度

- **鄰接矩陣**：O(V²)
- **鄰接表**：O(V + E)

---

## 七、Kosaraju's Algorithm

另一種找 SCC 的方法，利用**反向圖**的特性。

![Kosaraju 示意圖](https://web.ntnu.edu.tw/~algo/ConnectedComponent7.png)

### 原理

1. 在原圖上 DFS，記錄每個點的**完成時間順序**（類似拓樸排序）
2. 在**反向圖**上，按照完成時間**由大到小**做 DFS
3. 每棵 DFS tree 對應一個 SCC

### 偽碼骨架

```cpp
vector<int> finish;  // 記錄完成順序

// 第一次 DFS：原圖
void DFS1(int i) {
    visit[i] = true;
    for (int j : adj[i]) {
        if (!visit[j]) DFS1(j);
    }
    finish.push_back(i);  // 後序加入
}

// 第二次 DFS：反向圖
void DFS2(int i, int c) {
    scc[i] = c;  // 標記 SCC 編號
    visit[i] = true;
    for (int j : radj[i]) {  // radj = 反向邊
        if (!visit[j]) DFS2(j, c);
    }
}

void Kosaraju() {
    // 第一階段
    for (int i = 0; i < V; i++) {
        if (!visit[i]) DFS1(i);
    }

    // 第二階段（反向順序）
    fill(visit, visit + V, false);
    int scc_count = 0;
    for (int i = V - 1; i >= 0; i--) {
        int v = finish[i];
        if (!visit[v]) {
            DFS2(v, scc_count++);
        }
    }
}
```

### 時間複雜度

- **鄰接矩陣**：O(V²)
- **鄰接表**：O(V + E)

---

## 八、2-Satisfiability（2-SAT）

![2-SAT 示意圖](https://web.ntnu.edu.tw/~algo/2-Satisfiability1.png)

### 問題描述

給定一個**合取範式（CNF）**，每個子句恰好有**兩個 literal**：

```
(X₁ or Y₁) and (X₂ or Y₂) and ... and (Xₙ or Yₙ)
```

判斷是否存在一組布林賦值使整個式子為真。

### 轉換為有向圖

**邏輯轉換規則**：

| 子句形式 | 等價於 | 對應的邊 |
|---------|--------|---------|
| (X or Y) | (¬X → Y) ∧ (¬Y → X) | ¬X → Y, ¬Y → X |
| (X or X) | (¬X → X) | ¬X → X |
| (X or ¬X) | 恆真 | 無需加邊 |

### 可解性判定

**關鍵定理**：2-SAT 有解 ⟺ 對於所有變數 X，**X 與 ¬X 不在同一個 SCC** 中。

> 若 X 與 ¬X 在同一個 SCC，代表 X → ¬X 且 ¬X → X 都成立，矛盾！

### 求解方法一：DFS 嘗試

- 對每個變數，嘗試設定其值
- 檢查是否產生矛盾
- 時間複雜度：O(VE)

### 求解方法二：SCC + 拓樸排序

![2-SAT 求解](https://web.ntnu.edu.tw/~algo/2-Satisfiability5.png)

**步驟**：
1. 建立蘊含圖
2. 找出所有 SCC
3. 收縮成 DAG
4. 按**逆拓樸順序**，對每個 SCC 設定值

**關鍵觀察**：
- 若 SCC(X) 的拓樸序在 SCC(¬X) 之後，則設 X = true
- 等價於：選擇**拓樸序較大**的那個

**偽碼骨架**：

```cpp
// 變數 i 對應節點 i（表示 Xᵢ）
// 變數 i 的否定對應節點 i + N（表示 ¬Xᵢ）

void solve() {
    // 1. 找所有 SCC（用 Tarjan 或 Kosaraju）
    find_SCC();

    // 2. 檢查可解性
    for (int i = 0; i < N; i++) {
        if (scc[i] == scc[i + N]) {
            // X 與 ¬X 在同一個 SCC，無解
            return UNSATISFIABLE;
        }
    }

    // 3. 依據 SCC 編號決定變數值
    // Tarjan 產生的 SCC 編號天然是逆拓樸序
    for (int i = 0; i < N; i++) {
        // scc 編號較小 = 拓樸序較大 = 選這個
        answer[i] = (scc[i] > scc[i + N]);
    }
}
```

**時間複雜度**：O(V + E)

### 相關題目

- UVa 10319、11294、11861、11930
- ICPC 3211、3713、4452、4849

---

## 九、總結對照表

| 類型 | 適用圖 | 是否重疊 | 收縮後結構 | 主要演算法 |
|-----|-------|---------|-----------|-----------|
| Connected Component | 無向 | 否 | 多個獨立點 | BFS/DFS |
| Biconnected Component | 無向 | 是（關節點） | Block-Cutvertex Tree | Tarjan |
| Bridge-Connected Component | 無向 | 否 | Tree | Tarjan |
| Strongly Connected Component | 有向 | 否 | DAG | Tarjan / Kosaraju |
| Weakly Connected Component | 有向 | 是 | — | BFS/DFS（忽略方向） |

---

## 十、練習題建議

### 基礎連通分量
- UVa 459、10765

### BCC / 關節點 / 橋
- ICPC 5135、4839、7605

### SCC
- UVa 11504、11709、11770、11838
- UVa 11324（Weakly Connected）

### 2-SAT
- UVa 10319、11294、11861、11930
- ICPC 3211、3713、4452、4849

---

## 十一、自我檢查

1. **Tarjan 與 Kosaraju 的差異**？各有什麼優缺點？
2. **為什麼 SCC 收縮後一定是 DAG**？
3. **2-SAT 為什麼可以用 SCC 求解**？背後的邏輯是什麼？
4. **如何從 SCC 的拓樸序得到 2-SAT 的解**？

> **結語**：連通分量是圖論的基礎，掌握 Tarjan 和 Kosaraju 後，很多複雜問題都能轉化成 DAG 上的 DP 或拓樸排序來解決。

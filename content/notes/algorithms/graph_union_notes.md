# Algorithms – Graph Theory & Related String Algorithms (Union Notes)

These notes merge:
- 課堂講義：Basic Graph Algorithms, Advanced Graph Algorithms, Reduction, NP-Completeness, Dynamic Programmingfileciteturn2file0turn2file1turn2file2turn2file3turn2file4  
- 先前整理的：DFS/BFS、SCC、BCC、Shortest Paths、MST、Max Flow、De Bruijn Sequence、Scrambled String DP 等。

---

## 0. 基本圖論概念回顧

我們主要處理 **有限圖** \(G = (V, E)\)：

- **頂點 (vertex / node)**：集合 \(V\)。  
- **邊 (edge / link)**：集合 \(E\)，每條邊連接一或兩個頂點。  
- **無向圖 / 有向圖 (undirected / directed)**：邊是否具有方向。  
- **加權圖 (weighted graph)**：每條邊有權重 \(w(e)\)（長度、成本、容量等）。  
- **路徑 path**：頂點序列，每對相鄰頂點之間有邊。  
- **簡單路徑 simple path**：除起點與終點外，不重複頂點。  
- **圈 / cycle**：起點與終點相同的簡單路徑。  
- **連通圖 connected graph**：任兩點間存在路徑。  
- **生成樹 spanning tree**：
  - 子圖，包含所有頂點；  
  - 無圈且連通；對連通圖，邊數必為 \(|V|-1\)。  
- **強連通 strongly connected (有向圖)**：任兩點間皆有有向路徑。  
- **強連通分量 SCC**：極大強連通子圖。fileciteturn2file1  
- **雙連通 biconnected (無向圖)**：任兩點間存在至少兩條點互斥路徑；移除任一頂點仍連通。  
- **雙連通分量 BCC**：極大雙連通子圖。fileciteturn2file1  

---

## 1. 深度優先搜尋 DFS

### 1.1 直覺

從某個起點出發，每次「往一條路走到底」，走不下去才回頭。是一種系統性探索整張圖的方法。fileciteturn2file0  

### 1.2 基本遞迴版 DFS

```pseudo
Algorithm DFS(G):
    for each vertex v in V(G) do
        visited[v] := false

    for each vertex v in V(G) do
        if not visited[v] then
            DFS_visit(G, v)

procedure DFS_visit(G, v):
    visited[v] := true
    preWORK(v)         // 可選，用來做各種應用

    for each edge (v, w) in E(G) do
        if not visited[w] then
            DFS_visit(G, w)
            postWORK(v, w)   // 可選：回溯時要做的事

    postWORK2(v)       // 可選：離開 v 時做的事
```

> 課堂版本 `Depth First Search(G, v)` / `Refined DFS(G, v)` 只是把 `preWORK` / `postWORK` 抽象化。fileciteturn2file0  

### 1.3 DFS 編號 & DFS 樹

- **DFS Number**：第一個造訪某個頂點的順序編號。  
- **DFS Tree**：在 DFS 中，所有「第一次造訪某個未標記頂點」所走的邊稱為 **樹邊 (tree edge)**，構成 DFS 樹或 DFS 森林。fileciteturn2file0  

```pseudo
Algorithm DFS_Numbering(G):
    for each v in V:
        visited[v] := false
    time := 1
    for each v in V:
        if not visited[v] then
            DFS_num(G, v)

procedure DFS_num(G, v):
    visited[v] := true
    DFSNumber[v] := time; time := time + 1
    for each (v, w) in E:
        if not visited[w] then
            parent[w] := v
            DFS_num(G, w)
```

### 1.4 連通分量 Connected Components（無向圖）

```pseudo
Algorithm Connected_Components(G):
    for each v in V:
        visited[v] := false
    component_id := 0

    for each v in V:
        if not visited[v] then
            component_id := component_id + 1
            DFS_CC(G, v, component_id)

procedure DFS_CC(G, v, id):
    visited[v] := true
    comp[v] := id
    for each (v, w) in E:
        if not visited[w] then
            DFS_CC(G, w, id)
```

時間複雜度 \(O(|V| + |E|)\)：每條邊、每個點最多被處理常數次。

### 1.5 有向圖中的邊分類與找環（Directed Cycle）

對有向圖，根據 DFS 樹可以把邊分成：

- **tree edge**：造訪未標記頂點時用到的邊。  
- **back edge**：從某點指向 DFS 樹中的祖先節點。  
- **forward edge**：指向自己的後代，但不是 tree edge。  
- **cross edge**：其他情況（不同子樹之間）。  

重要性質：**存在 back edge ⇔ 有向圖含有有向環**。

#### 偵測有向環的 DFS

講義用 `on_the_path` 記錄目前遞迴堆疊上的節點： 

```pseudo
Algorithm Has_Directed_Cycle(G):
    for each v in V:
        visited[v] := false
        onStack[v] := false

    for each v in V:
        if not visited[v] then
            if DFS_Cycle(G, v) then
                return true
    return false

function DFS_Cycle(G, v) -> bool:
    visited[v] := true
    onStack[v] := true

    for each edge (v, w) in E:
        if not visited[w] then
            if DFS_Cycle(G, w) then
                return true
        else if onStack[w] then
            // (v, w) 是 back edge → 有環
            return true

    onStack[v] := false
    return false
```

---

## 2. 廣度優先搜尋 BFS

### 2.1 直覺

一圈一圈擴張的搜尋。對「每條邊權重相同」的圖，BFS 產生的是從起點出發的 **最短路徑樹**。

### 2.2 標準 BFS

```pseudo
Algorithm BFS(G, s):
    for each v in V:
        visited[v] := false
        dist[v] := ∞
        parent[v] := NIL

    create empty queue Q
    visited[s] := true
    dist[s] := 0
    enqueue(Q, s)

    while Q not empty:
        v := dequeue(Q)
        preWORK(v)           // optional
        for each edge (v, w) in E:
            if not visited[w]:
                visited[w] := true
                dist[w] := dist[v] + 1
                parent[w] := v
                add edge (v, w) to BFS tree T
                enqueue(Q, w)
```

性質：  
- `dist[v]` = 從 `s` 到 `v` 的「邊數」最少距離。

---

## 3. 拓樸排序 Topological Sorting（DAG）

### 3.1 問題

給一張 **有向無環圖 (DAG)**，希望排出一個順序，使得每條邊 \((u,v)\) 中，\(u\) 一定在 \(v\) 之前。

### 3.2 Kahn 演算法（入度 + Queue）

講義的 `Topological Sorting(G)` 就是這個版本：

```pseudo
Algorithm Topological_Sort(G):
    for each v in V:
        indeg[v] := 0

    for each edge (u, v) in E:
        indeg[v] := indeg[v] + 1

    create empty queue Q
    for each v in V:
        if indeg[v] = 0:
            enqueue(Q, v)

    label := 0
    while Q not empty:
        v := dequeue(Q)
        label := label + 1
        topo[v] := label
        for each edge (v, w) in E:
            indeg[w] := indeg[w] - 1
            if indeg[w] = 0:
                enqueue(Q, w)
```

複雜度 \(O(|V| + |E|)\)。如果最後沒有處理完所有頂點，代表原圖含有有向環。

---

## 4. Eulerian Circuit（歐拉迴路）

### 4.1 定義與判定

- 在無向連通圖中，一條「走過每條邊恰好一次且回到起點」的閉路稱為 **Eulerian circuit**。  
- 定理：**若且唯若所有頂點的 degree 皆為偶數，圖才有 Eulerian circuit**。

### 4.2 Hierholzer 演算法（概念）

1. 從任一點出發，沿著還沒走過的邊一路走到回到起點形成一個圈。  
2. 若圈中尚有頂點有未走過的 incident edge，就在那個頂點再展開一圈，並「插入」原本的圈中。  
3. 重複直到沒有未走邊。  

（考試通常只問定義與定理、或讓你判斷圖是否 Eulerian；真正 pseudocode 不一定必考。）

---

## 5. 強連通分量 SCC（Tarjan 演算法版本）

講義 `Strongly Connected Components(G,n)` 使用 DFS + stack + High 值。

### 5.1 直覺

- 在同一個 SCC 中，每一對頂點之間都有有向路徑。  
- Tarjan 的想法：DFS 時，利用「能回溯到的最高 DFS 編號（High）」來判斷一個節點是否是某個 SCC 的「leader」。

### 5.2 演算法概念

- 每個節點有：`DFSNumber[v]`（由 n 遞減）、`High[v]`、`Component[v]`。  
- 使用一個 **stack** 暫存目前尚未分配 component 的頂點。  
- DFS 回溯到某個 v 時，若 `High[v] == DFSNumber[v]`，表示以 v 為 leader 的 SCC 已完整探索完畢，從 stack pop 出直到 v 就是一個 SCC。

### 5.3 Pseudocode（接近講義）

```pseudo
Algorithm SCC_All(G, n):
    for each vertex v:
        DFSNumber[v] := 0
        Component[v] := 0
    CurrentComp := 0
    DFSN := n
    for each vertex v:
        if DFSNumber[v] = 0:
            SCC_DFS(v)

procedure SCC_DFS(v):
    DFSNumber[v] := DFSN
    DFSN := DFSN - 1
    push v onto Stack
    High[v] := DFSNumber[v]

    for each edge (v, w):
        if DFSNumber[w] = 0 then          // tree edge
            SCC_DFS(w)
            High[v] := max(High[v], High[w])
        else if DFSNumber[w] > DFSNumber[v] and Component[w] = 0 then
            // back / forward / cross edge pointing to not-yet-assigned vertex
            High[v] := max(High[v], DFSNumber[w])
            // (講義註解：也可以用 High[w])
    
    if High[v] = DFSNumber[v] then
        CurrentComp := CurrentComp + 1
        repeat
            x := pop Stack
            Component[x] := CurrentComp
        until x = v
```

時間複雜度：與 DFS 相同，\(O(|V|+|E|)\)。

---

## 6. 雙連通分量 BCC（無向圖）

講義 `Biconnected Components(G,v,n)` 同樣使用 DFS + High 值 + stack，不同的是：  
- DFSNumber 由 n 遞減；  
- High[v] = 能回到的最大 DFSNumber；  
- 當子節點 w 回傳後若 `High[w] <= DFSNumber[v]`，那麼以邊 (v,w) 為界切出一個 BCC。

### 6.1 直覺

- BCC 中任兩點間至少有兩條點互斥路徑。  
- **割點 (articulation point)**：移除它會讓圖變成不連通。  
- 事實上，一個割點會屬於多個 BCC。  
- 根據性質：「兩條邊 e,f 屬於同一 BCC ⇔ 存在一個 cycle 同時包含 e 和 f」。 

### 6.2 Pseudocode（接近課堂版本）

我們用「邊 stack」來存目前 DFS 路徑上的邊。每次切出一個 BCC，就把那個 BCC 的邊全部從 stack pop 出來。

```pseudo
Algorithm BCC_All(G, root, n):
    for each vertex v:
        DFSNumber[v] := 0
    DFSN := n
    create empty stack S    // stack of edges

    BC_DFS(root, parent = NIL)

procedure BC_DFS(v, parent):
    DFSNumber[v] := DFSN
    DFSN := DFSN - 1
    High[v] := DFSNumber[v]

    for each edge (v, w) in E:
        if w = parent then
            continue

        if DFSNumber[w] = 0 then          // tree edge
            push edge (v, w) onto S
            BC_DFS(w, v)

            if High[w] <= DFSNumber[v] then
                // (v, w) 是此 BCC 與上一層的分界
                output "New BCC:"
                repeat
                    (x, y) := pop S
                    output edge (x, y) as part of this BCC
                until (x, y) = (v, w)

            High[v] := max(High[v], High[w])
        else if DFSNumber[w] > DFSNumber[v] then
            // back edge (無向圖以 DFS 編號判斷)
            push edge (v, w) onto S
            High[v] := max(High[v], DFSNumber[w])
```

注意：在 SCC 中使用 `max(High[v], High[w])` 沒問題；但在 BCC 的「非樹邊」情況必須用 `DFSNumber[w]`，不能用 `High[w]`，否則會把跨越多層的資訊吃掉。這也是講義中特別註解的地方。 

---

## 7. 單源最短路徑 SSSP

假設圖為有向加權圖 \(G=(V,E)\)，權重可以是負的，但 **沒有負權重環**。

### 7.1 DAG 上的最短路徑（Topological DP）

講義中的 `Acyclic Shortest Paths(G,v,n)`：利用拓樸排序，由「不可能再被更新」的順序處理。 

簡單非遞迴版：

```pseudo
Algorithm DAG_SSSP(G, s):
    topo_order := Topological_Sort(G)
    for each v in V:
        dist[v] := ∞
    dist[s] := 0

    for each u in topo_order:
        for each edge (u, v) with weight w:
            if dist[u] + w < dist[v]:
                dist[v] := dist[u] + w
```

### 7.2 Dijkstra（所有邊權重非負）

講義 `Single Source Shortest Paths(G, v)`：每次從尚未確定的頂點中選 dist 最小者擴張。

```pseudo
Algorithm Dijkstra(G, s):
    for each v in V:
        dist[v] := ∞
        visited[v] := false
    dist[s] := 0

    while exists unvisited vertex:
        u := unvisited vertex with minimal dist[u]   // 或用 min-heap
        visited[u] := true
        for each edge (u, v) with weight w:
            if not visited[v] and dist[u] + w < dist[v]:
                dist[v] := dist[u] + w
```

- 若用最小堆：時間 \(O((|V|+|E|)\log|V|)\)。
- **要求所有權重非負**。

### 7.3 DP 版 Bellman–Ford（最多 \(n-1\) 條邊）

在 DP 講義裡，定義 \(D_l(u)\)：從 s 到 u、最多 l 條邊的最短路徑長度，並寫出遞迴關係：

\[
D_1(u) =
\begin{cases}
	\text{length}(s,u) & (s,u)\in E \\
0 & u = s \\
\infty & 	\text{otherwise}
\end{cases}
\]

\[
D_l(u) = \min\Big( D_{l-1}(u),\ \min_{(x,u)\in E}\{D_{l-1}(x) + w(x,u)\} \Big), \ 2\le l\le n-1
\]

實作上可把第一維壓扁成目前 dist 陣列（即一般的 Bellman–Ford）：

```pseudo
Algorithm Bellman_Ford(G, s):
    for each v in V:
        dist[v] := ∞
    dist[s] := 0

    // 最多 n-1 輪，每輪放鬆所有邊
    for i := 1 to |V|-1:
        for each edge (u, v) with weight w:
            if dist[u] + w < dist[v]:
                dist[v] := dist[u] + w

    // 之後再多跑一輪檢查負權重環
    for each edge (u, v) with weight w:
        if dist[u] + w < dist[v]:
            report "negative-weight cycle exists"
```

時間複雜度 \(O(|V||E|)\)。

---

## 8. 全源最短路徑 APSP（Floyd–Warshall）

DP 講義中定義：\(W_k(i,j)\) 為從 i 到 j 的最短路徑長度，限制中間頂點編號不超過 k。 

遞迴：

\[
W_0(i,j) = \begin{cases}
w(i,j) & (i,j)\in E \\
0 & i = j \\
\infty & 	ext{otherwise}
\end{cases}
\]

\[
W_k(i,j) = \min \big(W_{k-1}(i,j),\ W_{k-1}(i,k) + W_{k-1}(k,j) \big)
\]

實作：

```pseudo
Algorithm Floyd_Warshall(G):
    for i in 1..n:
        for j in 1..n:
            if i = j then dist[i][j] := 0
            else if (i, j) in E then dist[i][j] := w(i, j)
            else dist[i][j] := ∞

    for k in 1..n:
        for i in 1..n:
            for j in 1..n:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] := dist[i][k] + dist[k][j]
```

時間複雜度 \(O(n^3)\)。

---

## 9. 最小生成樹 MST（Prim & Kruskal）

### 9.1 定義

在連通無向加權圖中，尋找一棵生成樹，其邊權重總和最小，稱為 **Minimum-Cost Spanning Tree (MCST/MST)**。

### 9.2 Cut Property / Cycle Property（概念）

講義給出：對任何割 \((V_1, V_2)\)，跨越割且權重最小的那條邊一定在某棵 MST 中。   其等價描述也是：任何圈內的最大邊不會出現在某棵 MST 中。

### 9.3 Prim 演算法（講義版本）

講義 `MST(G)` 是 Prim 的一個變形：

**概念版 pseudocode：**

```pseudo
Algorithm Prim_MST(G):
    for each v in V:
        inMST[v] := false
        bestCost[v] := ∞
        bestEdge[v] := NIL

    // 任意選一點當起始（講義是選整張圖的最小邊）
    choose arbitrary root r
    bestCost[r] := 0

    repeat |V| times:
        // 找目前還沒在樹中、bestCost 最小的頂點
        u := argmin_{v | not inMST[v]} bestCost[v]
        inMST[u] := true
        if bestEdge[u] ≠ NIL:
            add bestEdge[u] to MST

        for each edge (u, w) with weight c:
            if not inMST[w] and c < bestCost[w]:
                bestCost[w] := c
                bestEdge[w] := (u, w)
```

用 min-heap 可達 \(O((|V|+|E|)\log|V|)\)。

### 9.4 Kruskal 演算法（補充）

雖然講義主要講 Prim，但課程通常也會講 Kruskal：

```pseudo
Algorithm Kruskal_MST(G):
    create a disjoint-set DS for all vertices
    sort all edges e in nondecreasing order by weight

    MST := ∅
    for each edge (u, v) in sorted edges:
        if Find(DS, u) ≠ Find(DS, v):
            MST := MST ∪ {(u, v)}
            Union(DS, u, v)

    return MST
```

時間：排序邊 \(O(|E|\log|E|)\) + Union-Find 幾乎線性。

---

## 10. Network Flow & Bipartite Matching Reduction

### 10.1 Network Flow 基本定義

圖 \(G=(V,E)\) 有： 

- source \(s\)、sink \(t\)。  
- 每條邊有容量 \(c(e) > 0\)。  
- flow \(f(e)\) 滿足：  
  1. \(0 \le f(e) \le c(e)\)。  
  2. 對所有中間節點 \(v 
e s,t\)，流入 = 流出（流量守恆）。  

目標：最大化從 s 到 t 的總流量。

### 10.2 Ford–Fulkerson / Edmonds–Karp（概念版）

2. BFS to find shortest augmenting path（Edmonds–Karp 核心）
```pseudo
function BFS(residual_capacity, adj, s, t, parent):
    # Find an s-t path in residual graph using BFS
    # Return true if path exists; also fill parent[] to record the path.

    for each vertex v:
        parent[v] := NIL

    create empty queue Q
    enqueue(Q, s)
    parent[s] := s    # mark source as visited

    while Q is not empty:
        u := dequeue(Q)

        for each v in adj[u]:
            if parent[v] = NIL and residual_capacity[u][v] > 0:
                parent[v] := u
                if v = t:
                    return true   # found s-t path
                enqueue(Q, v)

    return false      # no s-t path exists
```
- `parent[v]` 用來記錄在 BFS 樹裡，v 是從哪個頂點走來的。
- `residual_capacity[u][v] > 0 `才代表在殘存網路裡有邊可走。

3. Edmonds–Karp Max Flow 演算法
```pseudo 
function EdmondsKarp_MaxFlow(G, capacity, s, t):

    for each vertex u:
        for each vertex v:
            residual_capacity[u][v] := capacity[u][v]

    max_flow := 0

    create array parent[ ]  # for reconstructing path

    # While there exists an s-t augmenting path
    while BFS(residual_capacity, adj, s, t, parent) = true:

        # 1. Find bottleneck capacity along the path
        bottleneck := +∞
        v := t
        while v ≠ s:
            u := parent[v]
            if residual_capacity[u][v] < bottleneck:
                bottleneck := residual_capacity[u][v]
            v := u

        # 2. Augment flow along the path
        v := t
        while v ≠ s:
            u := parent[v]
            # forward edge: increase flow from u to v
            residual_capacity[u][v] := residual_capacity[u][v] - bottleneck
            # backward edge: allow cancellation of this flow in future
            residual_capacity[v][u] := residual_capacity[v][u] + bottleneck
            v := u

        max_flow := max_flow + bottleneck

    return max_flow

```

```pseudo
Algorithm Max_Flow(G, s, t):
    for each edge e:
        f[e] := 0

    while there exists an s-t augmenting path P in residual graph G_f:
        bottleneck := min residual capacity on edges of P
        for each edge e on P:
            if e is forward edge (u->v):
                f[e] := f[e] + bottleneck
            else if e is backward edge (v->u):
                f[rev(e)] := f[rev(e)] - bottleneck

    return f
```

- Edmonds–Karp 具體規定「augmenting path 用 BFS 找最少邊數」→ 保證多項式時間。

### 10.3 Bipartite Matching → Max Flow 的 reduction

講義有標準圖：左邊 V，右邊 U，中間是 bipartite edges，然後加 s 與 t。

**構造：**  
- 原始輸入：二分圖 \(G=(V,U,E)\)。  
- 建新圖 \(G'=(V',E')\)：  
  - \(V' = \{s\} \cup V \cup U \cup \{t\}\)。  
  - 邊：  
    - \((s,v)\) 對每個 \(v\in V\)，容量 1。  
    - 原二分圖中的邊 \((v,u)\) 變成 \((v,u)\)，容量 1。  
    - \((u,t)\) 對每個 \(u\in U\)，容量 1。  
- 在 \(G'\) 上算最大流，流量的 1-edges 對應到一個最大 matching。 

這是典型「圖論問題 → Flow → 線性規劃」三連還原的一部分。

---

## 11. De Bruijn Sequence（字串 / 圖論）

### 11.1 定義

對字母表大小為 \(k\)、字串長度為 \(n\)：  
**De Bruijn sequence** \(B(k,n)\)：一個循環序列，使得所有 \(k^n\) 個長度 n 的字串都恰好一次出現在某個長度為 n 的窗口中。  

例：  
- \(B(2,3)=00010111\) 長度 8；其所有長度 3 的子字串（循環看）剛好就是所有 8 種二進位字串。

### 11.2 DFS 生成演算法（Lyndon word / prefer-0 版本）

常見實作：

```pseudo
function DeBruijn(k, n):
    // 回傳一個 De Bruijn sequence over alphabet {0..k-1}
    a[0 .. k*n] := 0
    sequence := empty list

    procedure db(t, p):
        if t > n:
            if n mod p = 0:
                // output Lyndon word a[1..p]
                append a[1..p] to sequence
        else:
            a[t] := a[t-p]
            db(t+1, p)
            for j from a[t-p]+1 to k-1:
                a[t] := j
                db(t+1, t)

    db(1, 1)
    return sequence
```

輸出長度為 \(k^n\)，接下一個字串可以視為一個 Eulerian path / Hamiltonian path 在 De Bruijn graph 中。

---

## 12. Scrambled String 判定（DP）

題目：給長度一樣的字串 A, B，問 A 是否能透過「遞迴切割 & 子字串交換」scramble 變成 B。

### 12.1 DP 狀態

令：  
\(S(i,j,k)\)：Boolean，表示  
> A[i..i+k-1] 是否可以 scrambling 成 B[j..j+k-1]。fileciteturn2file4  

最終答案：`S(1, 1, n)`。

### 12.2 遞迴關係

長度 k ≥ 2 時，枚舉切割位置 t (1 ≤ t ≤ k-1)：

- 不交換：  
  - 左半：A[i..i+t-1] → B[j..j+t-1]  
  - 右半：A[i+t..i+k-1] → B[j+t..j+k-1]
- 交換：  
  - 左半：A[i..i+t-1] → B[j+k-t..j+k-1]  
  - 右半：A[i+t..i+k-1] → B[j..j+k-t-1]

\[
S(i,j,k) = \bigvee_{t=1}^{k-1} \Big(
   S(i,j,t)\land S(i+t, j+t, k-t)
   \ \lor   S(i, j+k-t, t) \land S(i+t, j, k-t)
\Big)
\]

Base case：\(k=1\)，`S(i,j,1) = (A[i] == B[j])`。

### 12.3 自底向上實作（概念）

```pseudo
Algorithm IsScramble(A, B):
    n := length(A)
    if n ≠ length(B): return false

    for i in 1..n:
        for j in 1..n:
            S[i][j][1] := (A[i] = B[j])

    for k from 2 to n:                  // substring length
        for i from 1 to n-k+1:
            for j from 1 to n-k+1:
                S[i][j][k] := false
                for t from 1 to k-1:
                    if ( S[i][j][t] and S[i+t][j+t][k-t] ) or
                       ( S[i][j+k-t][t] and S[i+t][j][k-t] ) then
                        S[i][j][k] := true
                        break

    return S[1][1][n]
```

時間複雜度約 \(O(n^4)\)（三層 i,j,k 再乘一層 t）。

---

## 13. 小結：考試時怎麼抓重點

1. **DFS/BFS/Topological Sort**  
   - Pseudocode + time complexity。  
   - DFS：connected components、找 cycle（directed / undirected）、DFS tree 性質。  
   - BFS：unweighted shortest path。  
   - Topological sort：DAG + indegree=0 queue。

2. **SCC / BCC**  
   - 狀態：DFSNumber, High, stack。  
   - 何時切 component：  
     - SCC：`High[v] == DFSNumber[v]`。  
     - BCC：子 w 回來後 `High[w] <= DFSNumber[v]`。  

3. **Shortest Paths**  
   - DAG + DP、Dijkstra（非負）、Bellman-Ford（負邊）、Floyd-Warshall（APSP）。  

4. **MST**  
   - Prim / Kruskal 演算法步驟、Cut / Cycle property。  

5. **Network Flow & Matching**  
   - 流量定義、Ford–Fulkerson 想法、bipartite matching → flow 的構造。  

6. **De Bruijn & Scrambled String**  
   - 知道 state 定義、遞迴關係、演算法大致流程即可。

---

（完）

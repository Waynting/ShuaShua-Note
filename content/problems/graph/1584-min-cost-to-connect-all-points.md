# 1584. Min Cost to Connect All Points

## Problem Information
- **Problem ID**: 1584
- **Title**: Min Cost to Connect All Points
- **Difficulty**: Medium
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/min-cost-to-connect-all-points/
- **Topics**: Graph, Minimum Spanning Tree, Kruskal, Union-Find (DSU)

## Problem Description

給定平面上 n 個點 `points[i] = [xi, yi]`。

任兩點連線成本為 **Manhattan distance**：

\[
|x_i - x_j| + |y_i - y_j|
\]

請回傳讓所有點連通的**最小總成本**。  
「所有點連通且任兩點之間恰好一條簡單路徑」等價於：要找一棵 **Minimum Spanning Tree (MST)**。

---

## Solutions

### Solution 1: Kruskal + DSU（Union-Find）
**核心想法**
- 把每個點視為 vertex，任兩點都有邊（complete graph），邊權是 Manhattan distance。
- 依邊權排序後，用 Kruskal 依序嘗試加入邊。
- 用 DSU 判斷是否會形成 cycle：只有 `Find(u) != Find(v)` 才能加入，並 `Union(u, v)`。

**Time Complexity**: 

- 建邊：\(O(n^2)\)
- 排序：\(O(n^2 \log n)\)
- DSU：近似 \(O(\alpha(n))\)（幾乎常數）
- **總計：\(O(n^2 \log n)\)**

**Space Complexity**: 

- edges：\(O(n^2)\)
- DSU：\(O(n)\)

#### Code
```cpp
class Solution {
public:
    struct DSU{
        std::vector<int> p, sz;
        DSU (int n = 0){ init(n); }
        void init(int n){
            p.resize(n);
            sz.assign(n,1);
            std::iota(p.begin(), p.end(), 0);
        }

        int Find(int x){
            return p[x] == x ? x : p[x] = Find(p[x]);
        }

        bool Union(int x, int y){
            int a = Find(x), b = Find(y);
            if(a == b) {return false;}
            if(sz[a] < sz[b]){ std::swap(a,b); } // 把 b 變成小的那個
            p[b] = a;
            sz[a] += sz[b];
            return true;
        }

    };

    struct Edge{
        int u, v;
        int w;

        bool operator<(Edge const& other) const {
            return this->w < other.w;
        }
    };

    int minCostConnectPoints(std::vector<std::vector<int>>& points) {
        int n = (int)points.size();
        // Build edge
        std::vector<Edge> edges;
        edges.reserve((long long)n*(n-1)/2);
        for(int i = 0; i < n; ++i){
            for(int j = i + 1; j <n; ++j){
                int w = std::abs(points[i][0] - points[j][0]) + std::abs(points[i][1] - points[j][1]);
                edges.push_back({i,j,w});
            }
        }

        // sort
        std::sort(edges.begin(), edges.end());

        // Kruskal
        DSU dsu(n);
        long long cost = 0;
        int used = 0;
        for(auto& e : edges){
            if(dsu.Union(e.u, e.v)){
                cost += e.w;
                used++;
                if(used == n-1){ break; } // MST done
            }
        }
        return (int)cost;
    }
};
```

### Solution 2: Prim (Optional)
> 本題也可用 Prim（用「每次找離 MST 最近的點」），在 n ≤ 1000 時可做到 **\(O(n^2)\)** 且不需要顯式建所有邊。  
> 若你之後想把同題的 Prim 也整理進筆記，我可以照同模板補上。

---

## Personal Notes
- **Kruskal 裸題**：看到「要讓所有點連通 + 成本最小 + 唯一路徑」就要想到 **MST**。

- 實作時主要卡在語法與 DSU 模板細節（Find/Union、path compression、union by size）。

- ✅ 這個 **Union-Find 模板（LeetCode 版本）一定要牢牢記住**：
  - MST（Kruskal）
  - 判斷 cycle
  - 連通塊合併 / 動態連通
  都會反覆出現。

- 小提醒：本題距離是 **Manhattan distance**，不是 Euclidean（不用 sqrt）。


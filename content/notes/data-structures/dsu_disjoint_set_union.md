# Disjoint Set Union（DSU / Union-Find）筆記

---

## 一、DSU 是什麼？

**Disjoint Set Union（不相交集合）** 是一種資料結構，用來動態維護：

- 多個「互不重疊的集合」
- 支援快速查詢：
  - 兩個元素是否屬於同一個集合
  - 合併兩個集合

在圖論中非常常見，特別是：

- **Minimum Spanning Tree（Kruskal）**
- Connected Components
- Cycle detection

---

## 二、核心操作

DSU 只做兩件事：

### 1️⃣ Find(x)

> 找出元素 `x` 所屬集合的「代表元素（root）」

性質：
- 同一集合中的所有元素，Find 出來的 root 相同

### 2️⃣ Union(x, y)

> 合併 `x` 與 `y` 所屬的兩個集合（若不同）

---

## 三、資料結構設計

### 基本版本（parent array）

- `parent[x] = x`：x 是集合代表
- `parent[x] = y`：x 的父節點是 y

每個集合實際上是一棵樹，root 是代表元素。

---

## 四、兩個關鍵優化（一定要會）

### ✅ 1. Path Compression（路徑壓縮）

在 `Find(x)` 時：

- 把 x 到 root 的整條路徑，直接接到 root
- 讓之後查詢幾乎是 O(1)

```cpp
int Find(int x) {
    if (parent[x] != x)
        parent[x] = Find(parent[x]);
    return parent[x];
}
```

---

### ✅ 2. Union by Size / Rank（依大小或高度合併）

想法：
- 永遠讓「小樹接到大樹」
- 避免樹退化成鏈

---

## 五、標準 C++ DSU 模板（推薦）

```cpp
struct DSU {
    vector<int> parent, size;

    DSU(int n) {
        parent.resize(n);
        size.assign(n, 1);
        iota(parent.begin(), parent.end(), 0);
    }

    int Find(int x) {
        if (parent[x] != x)
            parent[x] = Find(parent[x]);
        return parent[x];
    }

    // return true if merged, false if already same set
    bool Union(int a, int b) {
        a = Find(a);
        b = Find(b);
        if (a == b) return false;
        if (size[a] < size[b]) swap(a, b);
        parent[b] = a;
        size[a] += size[b];
        return true;
    }
};
```

📌 **時間複雜度**：
- 單次操作：\( \alpha(n) \)（反 Ackermann，幾乎常數）

---

## 六、DSU 在 Kruskal 中的角色

Kruskal 核心流程：

1. 把所有邊依權重排序
2. 依序嘗試加入邊 (u, v)
3. 若 `Find(u) != Find(v)`：
   - 不會形成 cycle
   - 可以加入 MST
   - 執行 `Union(u, v)`

### 為什麼 DSU 能避免 cycle？

- 若 u 和 v 已在同一集合
- 代表 MST 中已經有一條路徑連到
- 再加會形成環

---

## 七、常見錯誤整理

❌ 忘記初始化 parent

❌ Find 沒做 path compression（TLE 高機率）

❌ Union 沒做 size / rank 合併

❌ 在 Kruskal 中沒檢查 `Find(u) != Find(v)`

---

## 八、你現在應該能做到的事

- 手寫 DSU 模板（不用背，用理解）
- 解釋為什麼 Kruskal 正確
- 清楚 DSU 為什麼近似 O(1)

---

## 九、延伸練習（推薦）

- LeetCode 547 – Number of Provinces
- LeetCode 684 – Redundant Connection
- LeetCode 1584 – Min Cost to Connect All Points

---

（完）


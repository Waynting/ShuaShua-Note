---
title: "133. Clone Graph"
problemId: 133
difficulty: Medium
source: LeetCode
topics: Graph, DFS, BFS, Hash Map
---

# 133. Clone Graph

## 題目描述（重點中文整理）

給定一個「無向連通圖」中某一個節點 `node` 的指標，每個節點結構為：

```cpp
class Node {
public:
    int val;
    vector<Node*> neighbors;
};
```

請回傳這整張圖的 **深拷貝（deep copy）** 的起點節點指標。

條件與說明：

- 每個節點的 `val` 為 1 ~ n，且等於它在測資中的 index。
- 測資以 adjacency list 表示，例如：
  - `[[2,4],[1,3],[2,4],[1,3]]` 代表：
    - 1 連到 2, 4
    - 2 連到 1, 3
    - 3 連到 2, 4
    - 4 連到 1, 3
- 你必須回傳「新圖」中對應於原始 `node` 的節點指標，且：
  - 新圖與原圖結構完全相同
  - 所有節點都是 **新建** 的（不能共用原圖的節點）

---

## 解法思路整理

### 為什麼需要 Hash Map（老節點 → 新節點）

這題的關鍵在於：  
我們不只是「走訪圖」，還要「建立一張一模一樣的新圖」。

如果只有單純 DFS / BFS：

- 你只會「看過」每個節點與邊，但不會記住「這個舊節點的 clone 節點是哪一個」。

因此需要一個對照表：

```cpp
unordered_map<Node*, Node*> mp; // old node -> new node
```

在這個 map 裡：

- key（前者）：原圖節點指標（old node）
- value（後者）：新圖中對應的節點指標（cloned node）

意義：

- 每次第一次遇到某個原節點 `u`，就 `new Node(u->val)`，並存入 `mp[u]`。
- 之後任何地方只要需要「u 的 clone」，就直接用 `mp[u]` 拿。

---

### 流程：用 DFS + stack 走圖並建新圖

1. **處理空圖情況**  
   - 如果 `node == nullptr`，直接回傳 `nullptr`。

2. **初始化起點的 clone**  
   - 建立新節點 `cloneStart = new Node(node->val)`。
   - 在 map 裡記錄：`mp[node] = cloneStart`。
   - 用 `stack<Node*> st` 做 DFS，先 `st.push(node)`。

3. **DFS 主迴圈**  
   當 stack 不空時：

   - 取出一個原節點 `cur = st.top(); st.pop();`
   - 找到它在新圖中的對應：`cloneCur = mp[cur]`
   - 對於每個鄰居 `nei`：
     1. 如果 `nei` 還沒被 clone（`mp.find(nei) == mp.end()`）：
        - 建立 `mp[nei] = new Node(nei->val);`
        - `st.push(nei);` 之後會處理 `nei` 的鄰居
     2. 不管是不是第一次看到 `nei`，都可以透過 `mp[nei]` 取得 `nei` 的 clone：
        - `cloneNei = mp[nei]`
        - 把邊接起來：`cloneCur->neighbors.push_back(cloneNei);`

4. **回傳結果**  
   - 最後回傳 `cloneStart`（也可以寫成 `return mp[node];`）。

這樣就可以從原圖的起點 `node` 出發，遍歷整張圖，並在新圖中建立對應的節點與邊。

---

## C++ 解法實作（DFS + stack + unordered_map）

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    Node* cloneGraph(Node* node) {
        // 1. 空圖處理
        if (node == nullptr) {
            return nullptr;
        }

        // old node -> new node
        unordered_map<Node*, Node*> mp;

        // DFS 用的 stack
        stack<Node*> st;

        // 2. 先處理起點：建立第一個 clone，放進 map
        Node* cloneStart = new Node(node->val);
        mp[node] = cloneStart;
        st.push(node);

        // 3. 開始 DFS
        while (!st.empty()) {
            Node* cur = st.top();
            st.pop();

            // cur 對應的新節點（一定已存在於 mp）
            Node* cloneCur = mp[cur];

            // 4. 處理所有鄰居
            for (Node* nei : cur->neighbors) {
                // 如果第一次遇到這個鄰居，就建立它的 clone
                if (mp.find(nei) == mp.end()) {
                    mp[nei] = new Node(nei->val);
                    st.push(nei);
                }
                // 取得鄰居的 clone，接在 cloneCur 的 neighbors 裡
                Node* cloneNei = mp[nei];
                cloneCur->neighbors.push_back(cloneNei);
            }
        }

        // 5. 回傳起點的 clone
        return cloneStart;
    }
};
```

---

## 複雜度分析

- 設圖中節點數為 `V`，邊數為 `E`。
- 每個節點會被 push/pop 至多一次，每條邊也只會被檢查固定次數。

- **時間複雜度**：  
  \( O(V + E) \)

- **空間複雜度**：  
  - `unordered_map` 需要儲存所有節點的映射：\( O(V) \)
  - stack 在最壞情況下可能放入 \( O(V) \) 個節點  
  → 整體為 \( O(V) \)。

---

## 個人筆記 / 反思

- 一開始容易把這題當成「只是 DFS / BFS」，但其實重點是：
  - 必須構造一張「全新的圖」，
  - 不能直接指向原圖節點。
- 核心工具是 `unordered_map<Node*, Node*>`：
  - **key**：原圖節點（old node）
  - **value**：新圖對應節點（cloned node）
- `unordered_map` 同時扮演：
  - 記錄「old → new 映射」
  - 標記「這個節點是否已經處理過」的角色（可以不需額外 `visited` set）
- DFS / BFS 皆可：
  - 這份解法用 `stack` 做 DFS，比較直觀地配合「先建 clone，再延伸鄰居」的流程。
  - 若改成 queue 就是 BFS，整體邏輯幾乎一樣。

這題做熟之後，之後遇到「複製結構」類型題目（像是複製帶 random pointer 的 linked list、複製 DAG 結構等），都會直接想到「**原物件指標 → 新物件指標的 map**」這個 pattern。

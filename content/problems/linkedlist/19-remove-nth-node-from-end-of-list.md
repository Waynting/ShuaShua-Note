---
title: "19. Remove Nth Node From End of List"
problemId: 19
difficulty: Medium
source: LeetCode
topics: Linked List, Two Pointers
---

# 19. Remove Nth Node From End of List

## 題目敘述（中文整理）

給定一個單向鏈結串列的頭節點 `head`，以及一個整數 `n`，請**刪除鏈結串列中「倒數第 `n` 個節點」**，並回傳刪除後的串列頭節點。  

範例：  
- `head = [1,2,3,4,5], n = 2` → 刪掉倒數第 2 個（值為 4），結果 `[1,2,3,5]`  
- `head = [1], n = 1` → 刪掉唯一節點，結果 `[]`  
- `head = [1,2], n = 1` → 刪掉倒數第 1 個（值為 2），結果 `[1]`  

保證 `n` 一定合法（1 ≤ n ≤ 鏈表長度）。  

---

## 解法核心：雙指標（Two Pointers）＋ dummy 節點

### 1. 為什麼需要 dummy 節點？

若要刪除的是「頭節點」本身（例如 `head = [1], n = 1` 或 `head = [1,2], n = 2`），
如果我們只從 `head` 開始，很難在刪除時同時方便地更新頭指標。  

解法：  
- 建立一個假的頭節點 `dummy`，讓：  
  `dummy->next = head`  
- 之後一律從 `dummy` 開始走，這樣：  
  - 要刪除原本的頭節點時，只要修改 `dummy->next` 即可。  
  - 最後回傳 `dummy->next` 就是正確的新頭節點。  

### 2. 雙指標的設計：first & second

定義：  
- `first`：快指標  
- `second`：慢指標  
- 一開始都指向 `dummy`。  

目標：  
> 讓 `first` 和 `second` 保持「相距 n+1 個節點」的距離，  
> 當 `first` 走到 `nullptr` 時，`second` 剛好停在「要刪除節點的前一個節點」。  

原因：  
- 我們想刪掉「倒數第 n 個節點」。  
- 若 `first` 在末尾 `nullptr`，`second` 在某處：  
  - 如果兩者距離是 n+1，那 `second->next` 就是倒數第 n 個節點。  
  - 這時只要： `second->next = second->next->next` 就完成刪除。  

### 3. 步驟拆解

#### Step 1：建立 dummy，初始化指標

```cpp
ListNode* dummy = new ListNode(0);
dummy->next = head;

ListNode* first = dummy;
ListNode* second = dummy;
```

#### Step 2：讓 first 先走 n+1 步

```cpp
for (int i = 0; i <= n; ++i) {
    first = first->next;
}
```

此時：  
- `first` 比 `second` 超前了 **n+1 個節點**。  
- 為什麼是 `<= n` 而不是 `< n`？  
  - `i = 0` ~ `n` 共 `n+1` 次：包含了 dummy 本身的距離；  
  - 我們希望最後 `second` 指在「要刪除的節點的前一個」，也就是 dummy 也算進距離中。  

#### Step 3：同步移動 first 和 second

```cpp
while (first != nullptr) {
    first = first->next;
    second = second->next;
}
```

迴圈結束時：  
- `first == nullptr`：到達鏈表尾端之後一格。  
- `second` 剛好停在「要刪除節點的前一個節點」。  

#### Step 4：刪除節點

```cpp
ListNode* tmp = second->next;          // 要被刪掉的節點
second->next = second->next->next;     // 跳過它
// delete tmp;                         // C++ 可選擇釋放記憶體（LeetCode 不強制）
```

最後回傳：  

```cpp
return dummy->next;
```

---

## 偽碼骨架（不含完整結構宣告）

> 注意：這裡是「骨架／偽碼」，不是完整可提交程式，只是幫助記憶流程。

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    // 1. 建立 dummy，處理刪除頭節點的情況
    dummy = new node(0);
    dummy->next = head;

    first = dummy;
    second = dummy;

    // 2. 讓 first 先走 n+1 步
    for i from 0 to n:
        first = first->next;

    // 3. 同步移動 first, second
    while (first != null):
        first = first->next;
        second = second->next;

    // 4. 此時 second->next 就是要刪的節點
    target = second->next;
    second->next = second->next->next;
    // （可選）delete target;

    return dummy->next;
}
```

---

## 自己的口語理解（重點一句話版）

- 先加一個 `dummy` 在鏈表最前面，避免刪頭節點時很難處理。  
- 用 `first` 和 `second` 兩個指標：  
  - 先讓 `first` 往前走 `n+1` 步，製造出固定距離。  
  - 然後 `first`、`second` 一起走到 `first` 抵達尾端。  
  - 這時 `second` 正好指在「要刪掉的那個節點的前一個」，  
    所以只要把 `second->next` 改成 `second->next->next`，節點就被移除了。  

用你的原話來說就是：  
> 「用 `first` 當頭一路走到尾，`second` 紀錄要刪掉的點──更精確地說，其實是要刪掉節點的前一個點。」  

這樣就可以在單趟（O(L)）掃描裡完成「刪除倒數第 n 個節點」。  

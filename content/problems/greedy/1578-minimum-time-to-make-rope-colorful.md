---
title: "1578. Minimum Time to Make Rope Colorful"
problemId: 1578
difficulty: Medium
source: LeetCode
topics: Greedy, Array
---

# 1578. Minimum Time to Make Rope Colorful

> 類型：Greedy 一次掃描 | 難度：Medium
> 關鍵觀念：**每段連續相同顏色，只保留耗時最大的那一顆，其餘全部移除**。等價於「段內總和 − 段內最大值」。

---

## 題意重述（用自己的話）
有一串氣球，`colors[i]` 是第 `i` 顆的顏色，`neededTime[i]` 是移除該顆所需時間。要讓整條繩子**不出現相鄰同色**。可任意移除部分氣球，目標是**最小化總移除時間**。

---

## 解題策略（Greedy，單趟）
- 掃描整串字元，把相鄰同色視為「一段」。  
- 在同一段中，最後一定**只留一顆**；為使總成本最小，應**保留耗時最大**的那顆，其餘全部刪掉。  
- 實作時不需真的刪元素：
  - 維護 `keep` = 目前這段中「保留者」的耗時（段內最大值）。
  - 當遇到同色時：把 `min(keep, neededTime[i])` 加到答案（刪掉較小的那顆），再令 `keep = max(keep, neededTime[i])`。  
  - 當換色時：這段結束，新段 `keep = neededTime[i]`。

> 為什麼正確？  
> 對任一段，移除總成本固定為「總和 − 最大值」。逐一比較時，每次只刪掉兩者中較小者，等同最終只保留段內最大者。

---

## 你的實作（C++17）
```cpp
class Solution {
public:
    int minCost(string colors, vector<int>& neededTime) {
        int ans = 0;
        int keep = neededTime[0];
        for(int i = 1; i < colors.length(); ++i ){
            if(colors[i] == colors[i-1]){
                ans += min(keep, neededTime[i]);
                keep = max(keep, neededTime[i]);
            }
            else{
                keep = neededTime[i];
            }
        }
        return ans;
    }
};
```

---

## 複雜度
- 時間：`O(n)`（單次線性掃描）。  
- 空間：`O(1)` 額外空間（原地只用常數變數）。

---

## 邊界與常見坑
- 長度 `n = 0/1` → 答案為 `0`。  
- 只比較 `i` 與 `i-1`，避免越界；避免用 `i+1` 造成漏算或麻煩的邊界處理。  
- 不需要真的刪資料結構（不必 `erase/remove`），直接累加要刪除的耗時即可。

---

## 一句話總結
**同色連續段只留一顆、且保留段內耗時最大的那顆**，答案即為把其他較小者的耗時全部加總。

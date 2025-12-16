# 347. Top K Frequent Elements

## Problem Information
- **Problem ID**: 347
- **Title**: Top K Frequent Elements
- **Difficulty**: Medium
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/top-k-frequent-elements/
- **Topics**: Hash Table, Bucket Sort, Heap, Sorting

## Problem Description
給定整數陣列 `nums` 與整數 `k`，回傳出現次數最高的 **k 個元素**（順序不限）。  
Follow-up 要求：時間複雜度必須 **優於 O(n log n)**（n 是陣列長度）。

---

## Solution 1: Frequency Map + Bucket（Bucket Sort by Frequency）

### 核心想法
- 先用 `unordered_map` 統計每個數字的頻率 `freq[x]`。
- 頻率的範圍一定在 **1..n**（最多每個元素都一樣，頻率就是 n）。
- 所以可以建立 `bucket[f]`：存放「出現 **f 次** 的所有數字」。
- 之後從 `f = n` 往下掃描 bucket，把元素加入答案直到湊滿 k 個。

這樣就避開了「把所有 unique 元素丟進 heap / 排序」的 `log` 因子，達到線性等級。

### Why it works（直覺正確性）
- `bucket[f]` 裡面全部都是頻率為 f 的數字，因此從高頻率往下掃，拿到的順序必然是「頻率由高到低」。
- 題目保證答案唯一，因此直接取到 k 個就可停止。

### Time / Space Complexity
- **Time Complexity**: `O(n)`
  - 計數：`O(n)`
  - 把 u 個 unique 放入 bucket：`O(u)`（u ≤ n）
  - 從 n 掃到 1：`O(n)`（掃描 bucket 的 index）
  - 整體：`O(n + u + n) = O(n)`
- **Space Complexity**: `O(n)`
  - `unordered_map` 需要 `O(u)`
  - `bucket` 大小 `n+1`，最壞情況總共也只會塞入 u 個元素，但結構本身是 `O(n)` 的容器。

---

### Code（C++17，可提交）
```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int,int> freq;
        freq.reserve(nums.size() * 2);

        for (int x : nums) freq[x]++;

        int n = (int)nums.size();
        vector<vector<int>> bucket(n + 1); // bucket[f] = numbers with frequency f

        for (auto &p : freq) {
            int num = p.first;
            int f = p.second;
            bucket[f].push_back(num);
        }

        vector<int> ans;
        ans.reserve(k);

        for (int f = n; f >= 1 && (int)ans.size() < k; --f) {
            for (int num : bucket[f]) {
                ans.push_back(num);
                if ((int)ans.size() == k) break;
            }
        }
        return ans;
    }
};
```

---

## (Optional) Solution 2: Min-Heap of Size k（如果 k 很小）
> 你原本寫的是 max-heap 丟全部 unique（最壞 `O(n log n)`）。  
> 改成 min-heap 只維持 k 個候選：`O(n + u log k)`，k 遠小於 n 時很快。

---

## Personal Notes
- 你的 max-heap 版本在實務上好寫也常過，但 follow-up 要「比 O(n log n) 更好」時，bucket 是最穩的線性解。
- Bucket 的關鍵在於：**頻率上界是 n**，因此可以拿「頻率」當作 index 做分類。
- 寫 bucket 時最容易忘記：`vector<vector<int>> bucket(n+1)` 必須用 `n` 而不是 `u`，因為頻率最大是 n。

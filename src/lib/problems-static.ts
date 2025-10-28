// 自動生成的題目數據文件 - 請勿手動編輯
export interface Problem {
  id: string;  // 複合唯一ID (source-originalId)
  originalId: number;  // 原始題目ID
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  source: 'LeetCode' | 'Codeforces' | 'Atcoder' | 'CSES' | 'Zerojudge' | 'Other';
  topics: string[];
  hasNote: boolean;
  noteUrl?: string;
  description?: string;
  filePath?: string;
  markdownContent?: string;
  createdAt: string;  // 創建日期 (YYYY-MM-DD)
}

export const PROBLEMS: Problem[] = [
  {
    "id": "leetcode-2",
    "originalId": 2,
    "title": "2. Add Two Numbers",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "LinkedList"
    ],
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0002-add-two-numbers.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/linkedlist/0002-add-two-numbers.md",
    "markdownContent": "# 2. Add Two Numbers\n\n## Problem Information\n- **Problem ID**: 2\n- **Title**: Add Two Numbers\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/add-two-numbers/description/\n- **Topics**: LinkedList, Math\n\n## Problem Description\n\nYou are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n## Solutions\n\n### Solution 1: Simulate Addition\n**Time Complexity**: O(max(m,n))\n**Space Complexity**: O(max(m,n))\n\n#### Approach\nSimulate the process of adding two numbers, paying attention to carry handling.\n\n#### Code\n```cpp\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        //reverse l1 to get thevalue\n        ListNode* temp;\n        int newVal = 0;\n\n        //l1\n        temp = l1;\n        std::vector<int> Numl1;\n        int sizel1 = 0;\n        while(temp != nullptr){\n            Numl1.push_back(temp->val);\n            sizel1++;\n            temp = temp->next;\n        } \n        \n        //Calculate l1 true value\n        for(int i=0;i<Numl1.size();i++){\n            newVal += static_cast<int>(Numl1[i]*pow(10,i));\n        }\n\n        temp = l2;\n        std::vector<int> Numl2;\n        int sizel2 = 0;\n        while(temp != nullptr){\n            Numl2.push_back(temp->val);\n            sizel2++;\n            temp = temp->next;\n        } \n\n        //Calculate l1+l2 true value\n        for(int i=0;i<Numl2.size();i++){\n            newVal += static_cast<int>(Numl2[i]*pow(10,i));\n        }\n\n        //判斷是幾位數\n        int digit = 1;\n        int cal = newVal;\n        while(cal % 10 == cal){\n            cal = static_cast<int>(cal/10);\n            digit++;\n        }\n\n        //拆成不同digit + 存進new ListNode\n        ListNode* head = new ListNode(newVal % 10);\n        ListNode* answer = head;\n        for(int i=1 ;i<digit;i++){\n            ListNode* NewNode = new ListNode(newVal % 10);\n            answer->next = NewNode;\n            answer = answer->next;\n            newVal = (newVal - newVal % 10)/10;\n        }\n        return head;\n        \n    }\n```\n\n#### Issues\nThis solution will overflow because the problem range > INT_MAX.\nIt converts both lists to numbers first, adds them, then converts back to a list.\n\n## Related Problems\n- 445. Add Two Numbers II\n- 369. Plus One Linked List\n\n## Notes\nBasic LinkedList operation problem. Need to pay attention to:\n- Carry handling\n- Different lengths of the two linked lists\n- Possible carry at the final digit",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-3",
    "originalId": 3,
    "title": "3. Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Sliding Window",
      "Hash Set",
      "Two Pointers"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/slidingwindow/3-longest-substring-without-repeating-characters.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/slidingwindow/3-longest-substring-without-repeating-characters.md",
    "markdownContent": "# 3. Longest Substring Without Repeating Characters\n\n## Problem Description\nGiven a string `s`, find the length of the **longest substring without repeating characters**.\n\nA substring is a contiguous non-empty sequence of characters within a string.\n\n---\n\n### Example 1\n**Input:**  \n`s = \"abcabcbb\"`  \n**Output:** `3`  \n**Explanation:** The answer is `\"abc\"`, with the length of 3.\n\n### Example 2\n**Input:**  \n`s = \"bbbbb\"`  \n**Output:** `1`  \n**Explanation:** The answer is `\"b\"`.\n\n### Example 3\n**Input:**  \n`s = \"pwwkew\"`  \n**Output:** `3`  \n**Explanation:** The answer is `\"wke\"`. Notice that `\"pwke\"` is a subsequence, not a substring.\n\n---\n\n## Solution 1: Brute Force (O(n²))\n\n### Code\n```cpp\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        int ans = 0;\n        for (int i = 0; i < s.length(); ++i) {\n            set<char> t;\n            int de = i;\n            while (de < s.length() && t.find(s[de]) == t.end()) {\n                t.insert(s[de]);\n                de++;\n            }\n            if ((int)t.size() > ans) {\n                ans = t.size();\n            }\n        }\n        return ans;\n    }\n};\n```\n\n### Explanation\n- 固定起點 `i`，用一個 `set<char>` 記錄目前子字串內出現過的字元。\n- 內層指標 `de` 從 `i` 向右擴展，直到遇到重複字元為止。\n- 每次更新最長長度 `ans = max(ans, t.size())`。\n\n### Complexity\n- **Time**: O(n²)  \n- **Space**: O(n)\n\n---\n\n## Solution 2: Sliding Window (Optimized O(n))\n\n### Idea\n這題其實是 **Sliding Window**（滑動視窗）的基本範例：  \n保持一個不含重複字元的「動態視窗」，使用雙指標 `l` 與 `r`：\n\n1. `r` 向右擴展，加入新字元。\n2. 若發現重複字元，移動左邊界 `l`，直到視窗內無重複。\n3. 持續更新最大長度。\n\n### Implementation\n```cpp\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> window;\n        int l = 0, ans = 0;\n\n        for (int r = 0; r < s.size(); ++r) {\n            while (window.count(s[r])) {\n                window.erase(s[l++]); // 移除左側重複字元\n            }\n            window.insert(s[r]);\n            ans = max(ans, r - l + 1);\n        }\n        return ans;\n    }\n};\n```\n\n### Complexity\n- **Time**: O(n)  \n- **Space**: O(Σ)，其中 Σ 是字元集大小（最壞情況為 O(256)）。\n\n---\n\n## Personal Notes\n\n- 🧠 **這題其實就是 Sliding Window 的基本題**。  \n  暴力法是兩層迴圈試所有子字串，滑動視窗法則是用「一進一出」維持無重複區間。  \n\n- ⚙️ 思路轉換：  \n  - 暴力法：每次重新檢查一段子字串。  \n  - 滑動窗：持續移動視窗邊界，不重複掃過同一元素。  \n\n- ✅ 學到的重點：  \n  - `set` 用來檢查重複。  \n  - `unordered_set` 搭配 while 移除左邊重複，效率更高。  \n  - `r - l + 1` 是目前視窗長度。\n\n---\n\n## Summary Table\n\n| 方法 | 思想 | 複雜度 | 備註 |\n|------|------|---------|------|\n| 暴力法 | 固定起點枚舉子字串 | O(n²) | 容易理解，效率低 |\n| 滑動視窗 | 雙指標維持無重複區間 | O(n) | 最佳實作方式 |\n\n---\n\n### Takeaway\n> 「Longest Substring Without Repeating Characters」是一題典型的滑動視窗模板，  \n> 也是理解雙指標與 hash set 應用的經典入門題。\n",
    "createdAt": "2025-10-09"
  },
  {
    "id": "leetcode-4",
    "originalId": 4,
    "title": "4. Median of Two Sorted Arrays",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Array"
    ],
    "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    "hasNote": true,
    "noteUrl": "/content/problems/array/0004-median-of-two-sorted-arrays.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/0004-median-of-two-sorted-arrays.md",
    "markdownContent": "# 4. Median of Two Sorted Arrays\n\n## Problem Information\n- **Problem ID**: 4\n- **Title**: Median of Two Sorted Arrays\n- **Difficulty**: Hard\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/median-of-two-sorted-arrays/description/\n- **Topics**: Array, Binary Search\n\n## Problem Description\n\nGiven two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n## Solutions\n\n### Solution 1: Merge Sort Approach\n**Time Complexity**: O(m+n)\n**Space Complexity**: O(m+n)\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n            size_t fullsize = nums1.size() + nums2.size();\n            size_t point1 = 0, point2 = 0;\n            vector<int> ans;\n            while(point1 != nums1.size() && point2 != nums2.size()){\n                if(nums1[point1] > nums2[point2]){\n                    ans.push_back(nums2[point2]);\n                    point2++;\n                }\n                else if(nums1[point1] < nums2[point2]){\n                    ans.push_back(nums1[point1]);\n                    point1++;\n                }\n                else{\n                    ans.push_back(nums1[point1]);\n                    ans.push_back(nums2[point2]);\n                    point1++;\n                    point2++;\n                }\n            }\n    \n            while(point1 != nums1.size()){\n                ans.push_back(nums1[point1]);\n                point1++;\n            }\n    \n            while(point2 != nums2.size()){\n                ans.push_back(nums2[point2]);\n                point2++;\n            }\n            \n            double median;\n            if(fullsize %2 == 1){\n                median = ans[(fullsize-1)/2];\n                \n            }\n            else{\n                median = static_cast<double>( (ans[fullsize/2] + ans[(fullsize/2) -1]) ) /2;\n        \n            }\n            return median;\n    \n        }\n    };\n```\n\n## Personal Notes\nThis was my first attempt using merge sort approach. The solution works but I know it doesn't meet the O(log(m+n)) requirement. Need to learn binary search approach for optimal solution.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-5",
    "originalId": 5,
    "title": "5. Longest Palindromic Substring",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "String"
    ],
    "description": "Given a string s, return the longest palindromic substring in s.",
    "hasNote": true,
    "noteUrl": "/content/problems/string/0005-longest-palindromic-substring.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/string/0005-longest-palindromic-substring.md",
    "markdownContent": "# 5. Longest Palindromic Substring\n\n## Problem Information\n- **Problem ID**: 5\n- **Title**: Longest Palindromic Substring\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/longest-palindromic-substring/description/\n- **Topics**: String, Dynamic Programming\n\n## Problem Description\n\nGiven a string s, return the longest palindromic substring in s.\n\n## Solutions\n\n### Solution 1: Expand Around Centers\n**Time Complexity**: O(n^2)\n**Space Complexity**: O(1)\n\n#### Approach\nExpand around each possible center point to find the longest palindromic substring.\n\n#### Code\n```cpp\n// Note: The original file had incorrect code, here's the correct expand around centers solution\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        if (s.empty()) return \"\";\n        \n        int start = 0, maxLen = 1;\n        \n        for (int i = 0; i < s.length(); i++) {\n            // Odd length palindrome\n            int len1 = expandAroundCenter(s, i, i);\n            // Even length palindrome\n            int len2 = expandAroundCenter(s, i, i + 1);\n            \n            int len = max(len1, len2);\n            if (len > maxLen) {\n                maxLen = len;\n                start = i - (len - 1) / 2;\n            }\n        }\n        \n        return s.substr(start, maxLen);\n    }\n    \nprivate:\n    int expandAroundCenter(string s, int left, int right) {\n        while (left >= 0 && right < s.length() && s[left] == s[right]) {\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n};\n```\n\n## Related Problems\n- 516. Longest Palindromic Subsequence\n- 647. Palindromic Substrings\n\n## Notes\nClassic string processing problem that can be solved with multiple approaches:\n- Expand around centers\n- Dynamic programming\n- Manacher's algorithm",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-12",
    "originalId": 12,
    "title": "12. Integer to Roman",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Math"
    ],
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0012-integer-to-roman.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/math/0012-integer-to-roman.md",
    "markdownContent": "# 12. Integer to Roman\n\n## Problem Information\n- **Problem ID**: 12\n- **Title**: Integer to Roman\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/integer-to-roman/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven an integer, convert it to a roman numeral.\n\n## Solutions\n\n### Solution 1: Greedy Approach\n**Time Complexity**: O(1)\n**Space Complexity**: O(1)\n\n#### Approach\nProcess each Roman numeral symbol from largest to smallest, using greedy strategy to use the largest symbols possible.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        string intToRoman(int num) {\n            int ans[13] = {0};\n            while(num >= 1000){ //M\n                ans[0]++;\n                num -=1000;\n            }\n    \n            if(num < 1000 && num >= 900){ //CM\n                ans[1]++;\n                num -= 900;\n            }\n            else if(num < 500 && num >= 400){ //CD\n                ans[2]++;\n                num -= 400;\n            }\n            while(num >= 500){ //D\n                ans[3]++;\n                num -= 500;\n            }\n            while(num >= 100){//C\n                ans[4]++;\n                num -= 100;\n            }\n    \n            if(num < 100 && num >= 90){ //XC\n                ans[5]++;\n                num -= 90;\n            }\n            else if(num < 50 && num >= 40){ //XL\n                ans[6]++;\n                num -= 40;\n            }\n            while(num >= 50){//L\n                ans[7]++;\n                num -= 50;\n            }\n            while(num >= 10){//X\n                ans[8]++;\n                num -= 10;\n            }\n    \n            if(num == 9){ //IX\n                ans[9]++;\n                num -= 9;\n            }\n            else if(num == 4){ //IV\n                ans[10]++;\n                num -= 4;\n            }\n            while(num >= 5){//V\n                ans[11]++;\n                num -= 5;\n            }\n            while(num >= 1){//I\n                ans[12]++;\n                num -= 1;\n            }\n    \n            string answer = \"\";\n            for(int i=0;i<13;i++){\n                for(int j=0; j < ans[i];j++){\n                    if(i == 0){\n                        answer+=\"M\";\n                    }\n                    else if(i == 1){\n                        answer+=\"CM\";\n                    }\n                    else if(i == 2){\n                        answer+=\"CD\";\n                    }\n                    else if(i == 3){\n                       answer+=\"D\";\n                    }\n                    else if(i == 4){\n                        answer+= \"C\";\n                    }\n                    else if(i == 5){\n                       answer+= \"XC\";\n                    }\n                    else if(i == 6){\n                        answer+= \"XL\";\n                    }\n                    else if(i == 7){\n                        answer+= \"L\";\n                    }\n                    else if(i == 8){\n                        answer+= \"X\";\n                    }\n                    else if(i == 9){\n                        answer+= \"IX\";\n                    }\n                    else if(i == 10){\n                        answer+= \"IV\";\n                    }\n                    else if(i == 11){\n                        answer+= \"V\";\n                    }\n                    else {\n                        answer+= \"I\";\n                    }\n                }\n            }\n            return answer;\n    \n        }\n    };\n```\n\n#### Key Points\n- Handle special cases (4, 9, 40, 90, 400, 900)\n- Process from largest to smallest in order\n\n## Related Problems\n- 13. Roman to Integer\n\n## Notes\nCan use arrays to store symbols and corresponding values to make the code more concise.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-13",
    "originalId": 13,
    "title": "13. Roman to Integer",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Math"
    ],
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0013-roman-to-integer.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/math/0013-roman-to-integer.md",
    "markdownContent": "# 13. Roman to Integer\n\n## Problem Information\n- **Problem ID**: 13\n- **Title**: Roman to Integer\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/roman-to-integer/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven a roman numeral, convert it to an integer.\n\n## Solutions\n\n### Solution 1: Traverse and Process\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nTraverse each character to calculate corresponding values, then handle special cases (IV, IX, XL, XC, CD, CM) at the end.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        int romanToInt(string s) {\n            int ans = 0;\n            \n            for(int i=0;i<s.size();i++){\n                if(s[i] == 'M'){\n                    ans += 1000;\n                }\n                else if(s[i] == 'D'){\n                    ans += 500;\n                }\n                else if(s[i] == 'C'){\n                    ans += 100;\n                }\n                else if(s[i] == 'L'){\n                    ans += 50;\n                }\n                else if(s[i] == 'X'){\n                    ans += 10;\n                }\n                else if(s[i] == 'V'){\n                    ans += 5;\n                }\n                else if(s[i] == 'I'){\n                    ans += 1;\n                }\n    \n                \n            }\n    \n            if(s.find(\"IV\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"IX\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"XL\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"XC\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"CD\") != string::npos ){\n                ans -=200;\n            }\n    \n            if(s.find(\"CM\") != string::npos ){\n                ans -=200;\n            }\n    \n            return ans;\n        }\n    };\n```\n\n#### Key Points\n- First accumulate values of all characters\n- Then subtract the over-counted parts from special combinations\n\n## Related Problems\n- 12. Integer to Roman\n\n## Notes\nWhile this solution works, it's not efficient. A better approach is to handle special cases during traversal by comparing the current character with the next character.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-24",
    "originalId": 24,
    "title": "24. Swap Nodes in Pairs — 完整筆記（含可提交 C++ 迭代與遞迴）",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "LinkedList"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0024-swap-nodes-in-pairs.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/linkedlist/0024-swap-nodes-in-pairs.md",
    "markdownContent": "# 24. Swap Nodes in Pairs — 完整筆記（含可提交 C++ 迭代與遞迴）\n\n- **題目連結**：https://leetcode.com/problems/swap-nodes-in-pairs/description/\n- **主題**：Linked List、Pointer Rewiring、Recursion\n- **限制**：不可改值（只能改 `next` 指標）\n- **難度**：Medium\n\n---\n\n## 一、題意速記\n將單向鏈結串列中**每兩個相鄰節點**交換，回傳新表頭。若長度為奇數，最後一個節點維持不動。**不可**透過交換節點的值達成，必須調整指標。\n\n**例**：`1 → 2 → 3 → 4 → 5 → ∅` ⟶ `2 → 1 → 4 → 3 → 5 → ∅`\n\n---\n\n## 二、圖解（示意）\n\n### 局部交換（迭代每回合的重接）\n```\n交換前： prev → a → b → nextPair → ...\n目標：   prev → b → a → nextPair → ...\n\n三步驟：\n1) prev.next = b\n2) b.next    = a\n3) a.next    = nextPair\n然後 prev 前進到 a（因為 a 變成這一對的第二個）\n```\n\n### 全局前後對照\n```\nBefore:  1 → 2 → 3 → 4 → 5 → ∅\nAfter:   2 → 1 → 4 → 3 → 5 → ∅\n```\n\n---\n\n## 三、可提交解法（C++17）\n\n> LeetCode 既有 `struct ListNode { int val; ListNode* next; ... }`。以下程式可直接提交。\n\n### 方法 A：**迭代**（Dummy + 三指標）\n\n- 用 **dummy** 虛擬表頭處理頭部交換更直觀。\n- 每回合抓出一對節點 `a`、`b` 與 `nextPair`，照順序重接指標。\n- `prev` 每回合前進到 `a`。\n\n```cpp\n// Iterative solution\nclass Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        ListNode* dummy = new ListNode(0);\n        dummy->next = head;\n        ListNode* prev = dummy;\n\n        while (prev->next != nullptr && prev->next->next != nullptr) {\n            ListNode* a = prev->next;\n            ListNode* b = a->next;\n            ListNode* nextPair = b->next;\n\n            // swap a and b\n            prev->next = b;\n            b->next = a;\n            a->next = nextPair;\n\n            // move to next pair\n            prev = a;\n        }\n\n        ListNode* newHead = dummy->next;\n        delete dummy; // 可釋放 dummy（不影響 newHead）\n        return newHead;\n    }\n};\n```\n\n**時間複雜度**：`O(n)`（每節點恰被訪一次）  \n**空間複雜度**：`O(1)`（額外使用常數指標變數）\n\n---\n\n### 方法 B：**遞迴**（先換前兩個，遞迴處理後面）\n\n- Base：空或單節點直接回傳。\n- 否則 `first = head`，`second = head->next`：\n  - `first->next = swapPairs(second->next)`（遞迴處理後段並接回）\n  - `second->next = first`\n  - 回傳 `second` 作為這一段的新頭。\n\n```cpp\n// Recursive solution\nclass Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        if (head == nullptr || head->next == nullptr) return head;\n\n        ListNode* first = head;\n        ListNode* second = head->next;\n\n        first->next = swapPairs(second->next);\n        second->next = first;\n        return second;\n    }\n};\n```\n\n**時間複雜度**：`O(n)`  \n**空間複雜度**：`O(n)`（遞迴呼叫堆疊）\n\n---\n\n## 四、正確性要點\n\n- **迭代**：每回合只在局部 `prev → a → b → nextPair` 子結構內調整三條邊，保持其餘鏈結不變；交換結束後 `prev` 移至 `a`，下一回合處理下一對，直到無法再形成一對（`prev->next == nullptr` 或 `prev->next->next == nullptr`）。\n- **遞迴**：對長度 `0/1` 為真；假設長度 ≥ 2 時先正確交換前兩個，再對餘下子串列（從第三個開始）遞迴正確；最後將遞迴回傳的新頭接到 `first->next`，再把 `second->next = first`，即完成局部交換與全局串接。依數學歸納法成立。\n\n---\n\n## 五、常見坑點 Checklist\n\n- ☐ 忘了用 dummy，導致表頭更新複雜或錯誤。  \n- ☐ 指標使用 `.` 與 `->` 混淆（指標成員要用 `->`）。  \n- ☐ 重接次序錯誤：先把 `prev->next` 指向 `b` 前，務必先保留 `nextPair = b->next`。  \n- ☐ 迴圈推進錯誤：`prev` 要設為 `a`（交換後的第二個）。  \n- ☐ 遞迴版忘記把 `first->next` 接到遞迴結果，或忘記 `second->next = first`。\n\n---\n\n## 六、測試建議\n\n1. `[]` → `[]`  \n2. `[1]` → `[1]`  \n3. `[1,2]` → `[2,1]`  \n4. `[1,2,3]` → `[2,1,3]`  \n5. `[1,2,3,4]` → `[2,1,4,3]`  \n6. 大型隨機測資（檢查時間與健壯性）\n\n---\n\n## 七、補充：兩法比較\n\n| 面向 | 迭代 | 遞迴 |\n|---|---|---|\n| 可讀性 | 清楚、需小心指標順序 | 簡潔、貼近題意 |\n| 時間 | `O(n)` | `O(n)` |\n| 额外空間 | `O(1)` | `O(n)`（堆疊） |\n| 風險 | 指標重接順序錯誤 | 遞迴過深（理論上最差 `n` 層） |\n\n---\n\n**備註**：若環境需要嚴謹釋放 dummy 記憶體，迭代法中我們已在返回前 `delete dummy`；LeetCode 通常容許略過這一步，但保留更安全。\n\n",
    "createdAt": "2025-10-13"
  },
  {
    "id": "leetcode-33",
    "originalId": 33,
    "title": "33. Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "BinarySearch"
    ],
    "description": "Given an integer array nums sorted in ascending order and then rotated at an unknown pivot, and an integer target, return the index of target if it is in nums; otherwise, return -1.",
    "hasNote": true,
    "noteUrl": "/content/problems/binarysearch/33-search-in-rotated-sorted-array.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/binarysearch/33-search-in-rotated-sorted-array.md",
    "markdownContent": "# 33. Search in Rotated Sorted Array\n\n## Problem Information\n- **Problem ID**: 33\n- **Title**: Search in Rotated Sorted Array\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/search-in-rotated-sorted-array/\n- **Topics**: Binary Search, Array\n\n## Problem Description\n\nGiven an integer array nums sorted in ascending order and then rotated at an unknown pivot, and an integer target, return the index of target if it is in nums; otherwise, return -1.\n\nYou must write an algorithm with O(log n) time complexity.\n\nExample: Input: nums = [4,5,6,7,0,1,2], target = 0 → Output: 4\n\n## My Solution\n\n```cpp\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size()-1;\n        while(l <= r){\n            int mid = (l+r)/2;\n            if(nums[mid] == target){\n                return mid;\n            }\n            else{\n                if(nums[l] <= nums[mid]){\n                    // left is sorted\n                    if(nums[l] <= target && target < nums[mid]){\n                        r = mid - 1;\n                    }\n                    else{\n                        l = mid + 1;\n                    }\n                }\n                else{\n                    // right is sorted\n                    if(nums[mid] < target && target <= nums[r]){\n                        l = mid + 1;\n                    }\n                    else{\n                        r = mid - 1;\n                    }\n                }\n            }\n        }\n        return -1;\n    }\n};\n```\n\n## Notes\n\nKey idea: In a rotated sorted array, at least one side of mid is always sorted. Use this to determine which half to search.\n",
    "createdAt": "2025-10-02"
  },
  {
    "id": "leetcode-62",
    "originalId": 62,
    "title": "62. Unique Paths",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Dynamic Programming",
      "Combinatorics",
      "Grid Traversal"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/dynamicprogramming/62-unique-paths.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/dynamicprogramming/62-unique-paths.md",
    "markdownContent": "# 62. Unique Paths\n\n## Problem Description\nA robot is located at the top-left corner of an `m x n` grid.  \nThe robot can only move **either down or right** at any point in time.  \n\nThe robot is trying to reach the **bottom-right corner** of the grid.  \nHow many possible unique paths are there?\n\n---\n\n## Solutions\n\n### Solution 1: Dynamic Programming (Bottom-Up)\n**Time Complexity**: O(m·n)  \n**Space Complexity**: O(m·n)\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        vector<vector<int>> ma(m, vector<int>(n, 1));\n\n        for (int i = 1; i <= m - 1; ++i) {\n            for (int j = 1; j <= n - 1; ++j) {\n                ma[i][j] = ma[i][j - 1] + ma[i - 1][j];\n            }\n        }\n        return ma[m - 1][n - 1];\n    }\n};\n```\n\n---\n\n### Solution 2: Combinatorial Formula (Optimized Math)\n**Idea**:  \nThe robot must move exactly `(m-1)` steps down and `(n-1)` steps right — total `m+n-2` moves.  \nWe can choose where the downs (or rights) go:  \nC(m+n-2, m-1)\n\n**Time Complexity**: O(min(m, n))  \n**Space Complexity**: O(1)\n\n*(In C++ implementation, careful with overflow — use `long long` or iterative combination formula.)*\n\n---\n\n## Personal Notes\n- 一開始我是用數學公式：  \n  unique paths = C(m+n-2, m-1)\n  這是典型的「相同物排列」組合問題。  \n- 不過若直接用 factorial 會 **stack overflow 或 overflow**，特別是 m, n 較大時。  \n- 改成使用 DP 的「加法路徑」思路後，發現其實跟高中排列組合的推導一樣，  \n  只是用程式把每格的路徑數逐步加總：  \n  f[i][j] = f[i-1][j] + f[i][j-1]\n- 這題很適合入門動態規劃的表格思維，也能幫助理解組合數的遞推關係。\n",
    "createdAt": "2025-10-09"
  },
  {
    "id": "leetcode-72",
    "originalId": 72,
    "title": "72. Edit Distance",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/dynamicprogramming/72-edit-distance.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/dynamicprogramming/72-edit-distance.md",
    "markdownContent": "# LeetCode 72 — Edit Distance：解題筆記（1D DP 版本）\n\n> 目標：把 `word1` 轉成 `word2` 的最少操作數。允許 **插入、刪除、取代**，成本皆為 1。\n> 方法：Levenshtein 距離的動態規劃，使用 **一維滾動陣列** 降空間。\n\n## 1) DP 思路\n\n- 狀態：`C[i][j]` = 將 `word1[0..i-1]` 轉成 `word2[0..j-1]` 的最小成本\n- 邊界：\n  - `C[0][j] = j`  （空→B 前綴：插 j 次）\n  - `C[i][0] = i`  （A 前綴→空：刪 i 次）\n- 轉移：令 `a = word1[i-1]`, `b = word2[j-1]`, `cost = (a==b ? 0 : 1)`\n  \n  C[i][j] = min(\n    C[i-1][j]   + 1,      // 刪 a          ↑\n    C[i][j-1]   + 1,      // 插 b          ←\n    C[i-1][j-1] + cost    // 配對/取代     ↖\n  )\n\n- 時間：`O(nm)`，空間可壓到 `O(m)`（m = |word2|）\n\n---\n\n## 2) 一維滾動陣列（重點）\n\n內層 `j` 從左到右更新：\n\n- 上 (↑)  = 舊 `dp[j]`               → 刪除\n- 左 (←)  = 新 `dp[j-1]`（剛更新）   → 插入\n- 左上 (↖)= 變數 `prev`（上一輪的 `dp[j-1]`）→ 配對/取代\n\n更新骨架：\n```\ntmp = dp[j]                            // 上(舊)\ndp[j] = min(dp[j] + 1,                 // 刪\n            dp[j-1] + 1,               // 插\n            prev + cost)               // 配/換\nprev = tmp                             // 左上右移\n```\n\n---\n\n## 3) 可提交程式（C++，O(m) 空間）\n\n```cpp\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int n = word1.length(), m = word2.length();\n        vector<int> dp(m + 1);\n        for (int j = 0; j <= m; ++j) dp[j] = j;     // C[0][j]\n\n        for (int i = 1; i <= n; ++i) {\n            int prev = dp[0];                       // 舊 C[i-1][0]\n            dp[0] = i;                              // 新 C[i][0]\n            for (int j = 1; j <= m; ++j) {\n                int tmp  = dp[j];                   // 舊 C[i-1][j] (上)\n                int cost = (word1[i-1] == word2[j-1]) ? 0 : 1;\n                dp[j] = min({ dp[j] + 1,            // 刪\n                              dp[j-1] + 1,          // 插\n                              prev + cost });       // 配/換\n                prev = tmp;                         // 左上 → 下一格\n            }\n        }\n        return dp[m];\n    }\n};\n```\n\n---\n\n## 4) 「為什麼一維可行？」（直覺圖）\n\n更新 `C[i][j]` 畫面：\n```\n上一行:  ...  C[i-1][j-1](prev)   C[i-1][j](舊dp[j]) ...\n本  行:  ...  C[i][j-1](新dp[j-1])   C[i][j](dp[j] 將被覆寫)\n```\n- 左 = 新 `dp[j-1]`（已是本行）\n- 上 = 舊 `dp[j]`（仍是上一行）\n- 左上 = `prev`（用變數保存）\n\n---\n\n## 5) 小例（關鍵格）：`C[4,5]`\n\n若 `word1=\"bbaaa\"`, `word2=\"bbbaba\"`，且 `word1[3]='a'`, `word2[4]='b'` 不同：\n```\nC[4,5] = min(\n  C[3,5] + 1,   // 刪\n  C[4,4] + 1,   // 插\n  C[3,4] + 1    // 換\n) = 2\n```\n\n---\n\n## 6) 常見坑 & 加分\n- 只 `reserve` 不 `resize` → 不能用 `dp[i]=...`；要 `vector<int> dp(m+1);`\n- 內層一定 **左→右** 更新，確保 `dp[j-1]` 是本行值\n- 若要更省空間，令 `m = min(|A|, |B|)` 並確保用較短者當列長\n\n---\n\n## 7) 變體\n- **加權編輯距離**：三種操作成本不同（把 `+1` 改成對應權重）\n- **Damerau–Levenshtein**：加「相鄰交換」；轉移要看左下對角\n- **回溯重建操作序列**：需保留 2D parent 或改用 2D DP\n",
    "createdAt": "2025-10-28"
  },
  {
    "id": "leetcode-90",
    "originalId": 90,
    "title": "90. Subsets II",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Backtracking"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/backtracking/90-subsets-ii.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/backtracking/90-subsets-ii.md",
    "markdownContent": "# 90. Subsets II\n\n## Problem Information\n- **Problem ID**: 90\n- **Title**: Subsets II\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/subsets-ii/\n- **Topics**: Backtracking, Array, Sorting\n\n## Problem Description\nGiven an integer array `nums` that may contain duplicates, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.\n\n**Example:**\n```\nInput: nums = [1,2,2]\nOutput: [[],[1],[1,2],[1,2,2],[2],[2,2]]\n```\n\n## Solutions\n\n### Solution 1: Backtracking with Duplicate Skipping\n**Time Complexity**: O(n * 2^n) — generate all subsets with pruning for duplicates  \n**Space Complexity**: O(n) recursion depth + output\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        sort(nums.begin(), nums.end());        // 1) Sort to group duplicates\n        vector<vector<int>> ans;\n        vector<int> path;\n        dfs(0, nums, path, ans);\n        return ans;\n    }\n\nprivate:\n    void dfs(int start, const vector<int>& nums,\n             vector<int>& path, vector<vector<int>>& ans) {\n\n        // record current path as a subset\n        ans.push_back(path);\n\n        for (int i = start; i < (int)nums.size(); ++i) {\n            // skip duplicates on the same depth\n            if (i > start && nums[i] == nums[i-1]) continue;\n\n            path.push_back(nums[i]);\n            dfs(i + 1, nums, path, ans);\n            path.pop_back(); // backtrack\n        }\n    }\n};\n```\n\n---\n\n## Personal Notes\n- 我的思路：先排序，確保重複元素相鄰。\n- 遞迴 (DFS) 每一層代表「決定要不要選某個元素」。\n- **關鍵技巧**：`if (i > start && nums[i] == nums[i-1]) continue;` 這行保證同一層不會重複選一樣的數字。\n- 這題幫助我理解了 backtracking 的「決策樹」概念：每條路徑都是一個子集，回退 (pop_back) 是為了恢復狀態。\n\nMistakes I almost made:\n- 忘記在每層一開始就 `ans.push_back(path)` → 會漏掉空集和中間子集。\n- 忘記 pop_back → 路徑污染，結果錯誤。\n",
    "createdAt": "2025-10-03"
  },
  {
    "id": "leetcode-120",
    "originalId": 120,
    "title": "120. Triangle",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "DynamicProgramming"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/dynamicprogramming/120-triangle.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/dynamicprogramming/120-triangle.md",
    "markdownContent": "# 120. Triangle\n\n## Problem Information\n- **Problem ID**: 120\n- **Title**: Triangle\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/triangle/\n- **Topics**: Dynamic Programming, Array\n\n## Problem Description\nGiven a triangle array, return the minimum path sum from top to bottom.\n\nAt each step, you may move to an adjacent number of the row below.  \nMore formally, if you are on index `j` on the current row, you may move to index `j` or `j+1` on the next row.\n\n**Example:**\n```\nInput: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]\nOutput: 11\nExplanation: The minimum path is 2 -> 3 -> 5 -> 1 = 11.\n```\n\n## Solutions\n\n### Solution 1: Bottom-Up Dynamic Programming\n**Time Complexity**: O(n^2) — where n is the number of rows.  \n**Space Complexity**: O(1) extra space (reusing the triangle).\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    int minimumTotal(vector<vector<int>>& triangle) {\n        for (int i = triangle.size()-2; i >= 0; --i) {\n            for (int j = 0; j <= i; ++j) {\n                triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1]);\n            }\n        }\n        return triangle[0][0];\n    }\n};\n```\n\n---\n\n## Personal Notes\n- 一開始單純的想說用 greedy 從上往下找最小值就好，  \n  但其實這樣會錯，因為局部最小 ≠ 全局最小。  \n- 正確解法應該要 **從底部開始加總**，每一層更新為「自己 + 下一層相鄰兩個的最小值」，最後頂端就會是答案。  \n- 這題讓我理解了「自底向上的 DP」比「局部貪心」更可靠。  \n",
    "createdAt": "2025-10-05"
  },
  {
    "id": "leetcode-141",
    "originalId": 141,
    "title": "141. Linked List Cycle",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "LinkedList"
    ],
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0141-linked-list-cycle.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/linkedlist/0141-linked-list-cycle.md",
    "markdownContent": "# 141. Linked List Cycle\n\n## Problem Information\n- **Problem ID**: 141\n- **Title**: Linked List Cycle\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/linked-list-cycle/\n- **Topics**: LinkedList, Two Pointers\n\n## Problem Description\n\nGiven head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.\n\n## Solutions\n\n### Solution 1: Two Pointers (Floyd's Cycle Detection)\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nUse two pointers - fast and slow. The fast pointer moves two steps at a time while the slow pointer moves one step. If there's a cycle, they will eventually meet.\n\n#### Code\n```cpp\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\n    public:\n        bool hasCycle(ListNode *head) {\n            ListNode* slow = head;\n            \n            \n            if(head == nullptr || head-> next == nullptr){\n                return false;\n            }\n            ListNode* fast = head->next;\n    \n            while(slow != fast){\n                if(fast == nullptr || fast-> next == nullptr){\n                    return false;\n                }\n                \n                slow = slow->next;\n                fast = fast->next->next;\n            }\n    \n            return true;\n        }\n    };\n```\n\n#### Key Points\n- Two pointers technique is a classic algorithm for cycle detection\n- Pay attention to boundary condition handling\n\n## Related Problems\n- 142. Linked List Cycle II\n- 202. Happy Number\n\n## Notes\nFloyd's Cycle Detection Algorithm is an elegant algorithm, also known as the \"Tortoise and Hare\" algorithm. The key insight is that if there's a cycle, the fast pointer will eventually catch up to the slow pointer within the cycle.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-202",
    "originalId": 202,
    "title": "202. Happy Number",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "HashTable"
    ],
    "description": "Write an algorithm to determine if a number `n` is happy.",
    "hasNote": true,
    "noteUrl": "/content/problems/hashtable/202-happy-number.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/hashtable/202-happy-number.md",
    "markdownContent": "# 202. Happy Number\n\n## Problem Information\n- **Problem ID**: 202\n- **Title**: Happy Number\n- **Difficulty**: Easy\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/happy-number/\n- **Topics**: Hash Table, Two Pointers, Math\n\n## Problem Description\n\nWrite an algorithm to determine if a number `n` is happy.\n\nA **happy number** is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\n- Those numbers for which this process ends in 1 are happy.\n\nReturn `true` if `n` is a happy number, and `false` if not.\n\n## Solutions\n\n### Solution 1: Hash Set Cycle Detection\n**Time Complexity**: O(log n)\n**Space Complexity**: O(log n)\n\n#### Approach\nUse a hash set to detect cycles. Store all seen numbers, and if we encounter a number we've seen before (and it's not 1), we're in a cycle.\n\n#### Key Idea\n- Define `f(x) = sum of squares of digits of x`\n- Generate the sequence `n, f(n), f(f(n)), ...`\n- If the sequence hits `1` → return `true`\n- If it cycles without reaching `1` → return `false`\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    int sumSquares(int x) {\n        int sum = 0;\n        while (x > 0) {\n            int digit = x % 10;\n            sum += digit * digit;\n            x /= 10;\n        }\n        return sum;\n    }\n\n    bool isHappy(int n) {\n        unordered_set<int> seen;\n        int x = n;\n\n        while (x != 1 && seen.find(x) == seen.end()) {\n            seen.insert(x);\n            x = sumSquares(x);\n        }\n\n        return x == 1;\n    }\n};\n```\n\n### Solution 2: Floyd Cycle Detection (Two Pointers)\n**Time Complexity**: O(log n)\n**Space Complexity**: O(1)\n\n#### Approach\nUse Floyd's cycle detection algorithm (tortoise and hare) to detect cycles with O(1) space.\n\n#### Key Idea\n- `slow` pointer moves one step: `slow = f(slow)`\n- `fast` pointer moves two steps: `fast = f(f(fast))`\n- If they meet at 1, the number is happy\n- If they meet at any other number, there's a cycle (unhappy)\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    int sumSquares(int x) {\n        int sum = 0;\n        while (x > 0) {\n            int digit = x % 10;\n            sum += digit * digit;\n            x /= 10;\n        }\n        return sum;\n    }\n\n    bool isHappy(int n) {\n        int slow = sumSquares(n);\n        int fast = sumSquares(sumSquares(n));\n\n        while (slow != fast) {\n            slow = sumSquares(slow);\n            fast = sumSquares(sumSquares(fast));\n        }\n\n        return slow == 1;\n    }\n};\n```\n\n## Edge Cases\n- `n = 1` → already happy, return `true`\n- Single digit numbers (2-9)\n- The sequence either reaches 1 or enters a cycle\n- Common cycle contains 4: `4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4`\n\n## Related Problems\n- 141. Linked List Cycle\n- 142. Linked List Cycle II\n- 287. Find the Duplicate Number\n\n## Notes\n**Hash Set approach**:\n- Intuitive and easy to debug\n- Uses O(log n) space to store seen numbers\n\n**Floyd Cycle Detection**:\n- Space-optimal O(1) solution\n- Demonstrates the \"Two Pointers\" pattern\n- Same technique used in linked list cycle detection\n\n**Key insight**: The process of repeatedly applying a function and detecting whether it reaches a fixed point or enters a cycle is a common pattern in algorithm problems.\n\n## Test Cases\n```cpp\nassert(isHappy(19) == true);   // 19 → 82 → 68 → 100 → 1\nassert(isHappy(2) == false);   // enters cycle with 4\nassert(isHappy(1) == true);    // already 1\nassert(isHappy(7) == true);    // 7 → 49 → 97 → 130 → 10 → 1\n```\n",
    "createdAt": "2025-10-05"
  },
  {
    "id": "leetcode-209",
    "originalId": 209,
    "title": "LeetCode 209 — Minimum Size Subarray Sum",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "SlidingWindow"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/slidingwindow/0209-minimum-size-subarray-sum.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/slidingwindow/0209-minimum-size-subarray-sum.md",
    "markdownContent": "# 209. Minimum Size Subarray Sum — 題目筆記（Sliding Window）\n\n> **筆記重點**：這題是「**全為正數**」→ **滑動視窗**的經典題。利用兩個指標維持區間 `[l, r]`，右指標擴張、左指標在總和達標時盡量收縮以取得最短長度。\n\n---\n\n## 題目重述\n給定正整數 `target` 與正整數陣列 `nums`，找出**最短**長度的連續子陣列，使其元素總和 `≥ target`；若不存在回傳 `0`。\n\n- 輸入：`target ∈ ℕ⁺`，`nums[i] ∈ ℕ⁺`\n- 輸出：最短長度（或 `0`）\n\n**解題訊號**：元素全為正 → 子陣列和對右指標單調不減 → **Sliding Window** 可在線性時間完成。\n\n---\n\n## 核心想法（Sliding Window）\n1. 維持視窗和 `win` 與左端 `l`。右端 `r` 從左至右掃描：`win += nums[r]`。\n2. 只要 `win ≥ target`，就嘗試**收縮左端**（`while`），每次都更新最短長度並移除 `nums[l]`、左端右移。\n3. 掃完後，若從未達標，回傳 `0`。\n\n**為什麼要 `while` 而不是 `if`？**  \n因為在同一個 `r` 下，可能可以向右縮 `l` 多步而仍滿足 `win ≥ target`，每縮一步都有機會得到更短答案。\n\n---\n\n## 不變量與邊界\n- **不變量**：每輪內層 `while` 結束時，`win < target` 或 `l` 已經收縮到不能再小。\n- **邊界**：\n  - 若 `nums` 為空或所有元素總和 < `target` → 回傳 `0`。\n  - 使用 `INT_MAX` 作為答案初值；若資料範圍大，`win` 建議使用 `long long` 以避免溢位。\n- **複雜度**：時間 `O(n)`；空間 `O(1)`。每個索引最多被 `l`/`r` 走過一次。\n\n---\n\n## 語言無關偽碼（骨架）\n> 僅保留結構與重點步驟，避免成為可直接提交的完整程式。\n\n```\nfunction minSubArrayLen(target, nums):\n    n = length(nums)\n    ans = +INF\n    win = 0\n    l = 0\n\n    for r from 0 to n-1:\n        win += nums[r]\n        while win >= target:\n            ans = min(ans, r - l + 1)\n            win -= nums[l]\n            l += 1\n\n    if ans == +INF: return 0\n    else: return ans\n```\n\n---\n\n## 你的解答（Snapshot）\n> 這段為你剛剛提供的 C++ 程式，用來對照筆記重點。\n\n```cpp\nclass Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        \n        //sliding windows\n        int n = nums.size();\n        int win = 0, ans = INT32_MAX;\n        int winlength = 0;\n        int l = 0;\n        for(int i = 0; i < n ; ++i ){\n            win += nums[i];\n            while(win >= target){\n                winlength = i - l +1;\n                if(ans > winlength){\n                    ans = winlength;\n                }\n                win -= nums[l];\n                l++;\n            }\n        }\n        if(ans == INT32_MAX){\n            return 0;\n        }\n        return ans;\n    }\n};\n```\n\n### 極小幅建議（不改邏輯，只強化健壯性）\n- `ans` 改用 `INT_MAX`（記得 `#include <climits>`），以符合常見慣例。  \n- 若測資上限較大，`win` 可改 `long long` 避免溢位。  \n- 可省略 `winlength`，直接 `ans = min(ans, i - l + 1)`。\n\n---\n\n## 常見陷阱（Checklist）\n- ✅ 內層用 **`while (win >= target)`**，避免錯過更短長度。  \n- ✅ 不要提早 `return`，要掃完整個陣列並在每次可縮時更新最短解。  \n- ✅ 注意空陣列、無法達標時回傳 `0`。  \n- ✅ 大數據下的加總溢位（使用 `long long`）。\n\n---\n\n## 自測案例\n- `target=7, nums=[2,3,1,2,4,3]` → `2`（最短 `[4,3]`）  \n- `target=4, nums=[1,4,4]` → `1`  \n- `target=11, nums=[1,1,1,1,1,1,1,1]` → `0`  \n- 邊界：`target=3, nums=[3]` → `1`；`target=5, nums=[6]` → `1`；`target=5, nums=[1,2]` → `0`\n\n---\n\n## 變體思考\n- 若允許**負數**：滑動視窗的單調性破壞，通常改以前綴和＋平衡結構或其他技巧（例如單調佇列、二分等）依條件處理。\n- **前綴和＋二分**：亦可做本題（`O(n log n)`），但在本題的全正數設定下，滑動視窗 `O(n)` 更優雅。\n\n---\n\n## 你可以練習的微調\n1. 把 `win` 換 `long long`，移除 `winlength`，改為一行 `ans = min(ans, i - l + 1)`。\n2. 新增測資：`target=15, nums=[5,1,3,5,10,7,4,9,2,8]`，手算與程式比對。\n3. 思考：為何把 `while` 換 `if` 就可能錯過解？試舉例子。\n\n---\n\n> 筆記作者備註：  \n> 這題是「滑動視窗」在正整數陣列中的經典範式，解題重點是掌握「擴張右端、達標即收縮左端」的節奏與不變量。\n",
    "createdAt": "2025-10-14"
  },
  {
    "id": "leetcode-383",
    "originalId": 383,
    "title": "383. Ransom Note",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "HashTable"
    ],
    "description": "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.",
    "hasNote": true,
    "noteUrl": "/content/problems/hashtable/0383-ransom-note.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/hashtable/0383-ransom-note.md",
    "markdownContent": "# 383. Ransom Note\n\n## Problem Information\n- **Problem ID**: 383\n- **Title**: Ransom Note\n- **Difficulty**: Easy\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/ransom-note/description/\n- **Topics**: HashTable, String\n\n## Problem Description\n\nGiven two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.\n\nEach letter in magazine can only be used once in ransomNote.\n\n## Solutions\n\n### Solution 1: Brute Force Approach (Less Efficient)\n**Time Complexity**: O(n*m)\n**Space Complexity**: O(1)\n\n#### Approach\nIterate through each character in ransomNote, find and remove the corresponding character from magazine.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           \n            for(int i=0;i<ransomNote.size();i++){\n                bool stop = false;\n                for(int j=0;j<magazine.size();j++){\n                    if(ransomNote[i] == magazine[j]){\n                        magazine.erase(j,1);\n                        stop = true;\n                        break;\n                    }\n                }\n                if(!stop){\n                    return false;\n                }\n            }\n            return true;\n        }\n    };\n```\n\n### Solution 2: Character Counting (Optimized)\n**Time Complexity**: O(n+m)\n**Space Complexity**: O(1)\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           int characterList[26] = {0};\n           for(int i=0;i<magazine.size();i++){\n                for(int j=0;j<26;j++){\n                    if(magazine[i] == 'a'+j ){\n                        characterList[j]++;\n                        break;\n                    }\n                }\n           }\n    \n           for(int i=0;i<ransomNote.size();i++){\n                characterList[ransomNote[i]-'a']--;\n           }\n    \n           for(int i=0;i<26;i++){\n                if(characterList[i] < 0){\n                    return false;\n                }\n           }\n           return true;\n            \n        }\n    };\n```\n\n## Personal Notes\nStarted with brute force (removing characters one by one) then learned the character counting approach. The array indexing trick `magazine[i] - 'a'` was new to me but makes the solution much cleaner.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-469",
    "originalId": 469,
    "title": "469. Split Array With Minimum Difference",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Array"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/array/469-split-array-min-diff.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/469-split-array-min-diff.md",
    "markdownContent": "# 469. Split Array With Minimum Difference\n\n## Problem Information\n- **Problem ID**: 469\n- **Title**: Split Array With Minimum Difference\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/contest/weekly-contest-469/problems/split-array-with-minimum-difference/\n- **Topics**: Array, Prefix Sum, Greedy\n- **Statement (paraphrased)**:  \n  Given an integer array `nums`, split it into exactly two non-empty subarrays `left` and `right` such that:\n  - `left` is **strictly increasing**,\n  - `right` is **strictly decreasing**.  \n  Return the **minimum possible absolute difference** between the sums of `left` and `right`. If no valid split exists, return `-1`.\n\n## Examples\n- Example (made-up):  \n  `nums = [3, 5, 7, 4, 2]`  \n  Valid split at `i = 2` (0‑based): `left = [3,5,7]` strictly increasing, `right = [4,2]` strictly decreasing.  \n  `|sum(left) - sum(right)| = |15 - 6| = 9`.\n\n## Constraints (typical/assumed)\n- `2 ≤ n = nums.length`\n- `-10^9 ≤ nums[i] ≤ 10^9`\n- Result may exceed 32-bit range → use 64-bit (`long long`) for sums.\n\n---\n\n## Approach (Hint-First → Final Plan)\n### Key Idea\nWe need a cut index `i` where:\n- Prefix `nums[0..i]` is strictly increasing, and\n- Suffix `nums[i+1..n-1]` is strictly decreasing.\n\n### Observations\n- Single-element subarray counts as strictly increasing/decreasing (vacously true).\n- We can precompute two boolean arrays:\n  - `inc[i]`: whether `nums[0..i]` is strictly increasing.\n  - `dec[i]`: whether `nums[i..n-1]` is strictly decreasing.\n- With prefix sums `pref[i]`, we can compute sums of `left` and `right` in O(1).  \n- Enumerate all cut points `i ∈ [0..n-2]` (right must be non-empty).  \n  For each valid `i` with `inc[i] && dec[i+1]`, update the best difference.\n\n### Why not Greedy?\nChoosing the locally smaller next element top‑down does **not** guarantee a globally minimal difference, and may even pick an invalid split. We must check the whole prefix/suffix monotonic condition.\n\n---\n\n## Pseudocode\n```text\nn = len(nums)\nif n < 2: return -1\n\ninc[0] = true\nfor i in 1..n-1:\n    inc[i] = inc[i-1] && (nums[i-1] < nums[i])\n\ndec[n-1] = true\nfor i in n-2..0:\n    dec[i] = dec[i+1] && (nums[i] > nums[i+1])\n\npref[0] = nums[0]\nfor i in 1..n-1:\n    pref[i] = pref[i-1] + nums[i]\ntotal = pref[n-1]\n\nans = +INF\nfor i in 0..n-2:           # cut after i\n    if inc[i] && dec[i+1]:\n        left  = pref[i]\n        right = total - left\n        ans = min(ans, abs(left - right))\n\nreturn (ans == +INF ? -1 : ans)\n```\n\n---\n\n## Correctness Argument (Sketch)\n- `inc[i]` and `dec[i+1]` exactly encode the feasibility constraints for a cut after `i`.\n- We check **all** feasible cuts; if none, return `-1`.\n- For each feasible cut, we compute the exact difference using prefix sums, so the minimum over all feasible cuts is correct.\n\n---\n\n## Complexity\n- Time: `O(n)` to build `inc`, `dec`, `pref` and to scan all cuts.\n- Space: `O(n)` for `inc`, `dec`, `pref`. (Can be reduced with some in‑place tricks, but `O(n)` is clean.)\n\n---\n\n## C++17 Reference Implementation\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    long long splitArray(vector<int>& nums) {\n        int n = (int)nums.size();\n        if (n < 2) return -1; // two non-empty subarrays required\n\n        // inc[i]: nums[0..i] is strictly increasing\n        vector<char> inc(n, 0);\n        inc[0] = 1;\n        for (int i = 1; i < n; ++i) {\n            inc[i] = inc[i-1] && (nums[i-1] < nums[i]);\n        }\n\n        // dec[i]: nums[i..n-1] is strictly decreasing\n        vector<char> dec(n, 0);\n        dec[n-1] = 1;\n        for (int i = n-2; i >= 0; --i) {\n            dec[i] = dec[i+1] && (nums[i] > nums[i+1]);\n        }\n\n        // prefix sums (64-bit)\n        vector<long long> pref(n);\n        pref[0] = nums[0];\n        for (int i = 1; i < n; ++i) pref[i] = pref[i-1] + (long long)nums[i];\n        long long total = pref[n-1];\n\n        long long best = LLONG_MAX;\n        for (int i = 0; i <= n-2; ++i) { // cut after i\n            if (inc[i] && dec[i+1]) {\n                long long leftSum  = pref[i];\n                long long rightSum = total - leftSum;\n                long long diff = leftSum - rightSum;\n                if (diff < 0) diff = -diff;\n                best = min(best, diff);\n            }\n        }\n        return (best == LLONG_MAX ? -1 : best);\n    }\n};\n```\n\n---\n\n## Edge Cases & Tests\n1. `nums = [3,2,1]` → cut at `i=0`, left `[3]` inc, right `[2,1]` dec → `|3 - 3| = 0`  \n2. `nums = [1,2]` → cut at `i=0`, left `[1]` inc, right `[2]` dec (single element ok) → `|1-2|=1`  \n3. `nums = [1,1,1]` → no strict inc/dec split → `-1`  \n4. `nums = [2,4,6,3,1]` → valid at `i=2` → diff `|12 - 4| = 8`  \n5. Large positives/negatives → verify 64-bit sums.\n\n---\n\n## Personal Notes\n原本想說找到那個分界的Peak的位置和個數（因為不可能會有兩個Peak，除非Peak就是第一個數字）就可以比較大小，但後來發現應該要改用 `inc/dec` 單調性判定 + 前綴和後，僅需 O(n) 就能枚舉所有合法切點並取得最小差值。\n",
    "createdAt": "2025-10-05"
  },
  {
    "id": "leetcode-543",
    "originalId": 543,
    "title": "543. Diameter of Binary Tree",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Tree"
    ],
    "description": "Given the root of a binary tree, return the length of the diameter of the tree.",
    "hasNote": true,
    "noteUrl": "/content/problems/tree/0543-diameter-of-binary-tree.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/tree/0543-diameter-of-binary-tree.md",
    "markdownContent": "# 543. Diameter of Binary Tree\n\n## Problem Information\n- **Problem ID**: 543\n- **Title**: Diameter of Binary Tree\n- **Difficulty**: Easy\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/diameter-of-binary-tree/description/\n- **Topics**: Tree, DFS\n\n## Problem Description\n\nGiven the root of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\n## Solutions\n\n### Solution 1: DFS Recursion\n**Time Complexity**: O(n)\n**Space Complexity**: O(h), where h is the height of the tree\n\n#### Code\n```cpp\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int max_diameter = 0;\n\n    int dfs(TreeNode* node) {\n        if (node == nullptr) return 0;\n\n        int left = dfs(node->left);\n        int right = dfs(node->right);\n\n        max_diameter = max(max_diameter, left + right);\n\n        return max(left, right) + 1;\n    }\n\n    int diameterOfBinaryTree(TreeNode* root) {\n        dfs(root);\n        return max_diameter;\n    }\n};\n```\n\n## Personal Notes\nFirst tree DFS problem I solved. The tricky part was realizing that I need to track the maximum diameter separately while calculating depths. The global variable approach worked well here.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-2099",
    "originalId": 2099,
    "title": "2099. Find Subsequence of Length K With the Largest Sum",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Sort"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/sort/2099-max-subsequence.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/sort/2099-max-subsequence.md",
    "markdownContent": "# 2099. Find Subsequence of Length K With the Largest Sum\n\n## Problem Information\n- **Problem ID**: 2099\n- **Title**: Find Subsequence of Length K With the Largest Sum\n- **Difficulty**: Easy\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/\n- **Topics**: Sorting, Heap (Priority Queue)\n\n---\n\n## Problem Description\nYou are given an integer array `nums` and an integer `k`.  \nYou want to find a **subsequence** of `nums` of length `k` that has the **largest sum**.\n\nReturn any such subsequence as an integer array of length `k`.\n\nA subsequence is an array that can be derived from another array by deleting some or no elements **without changing the order** of the remaining elements.\n\n---\n\n## Example\n\n### Input\n```\nnums = [2,1,3,3], k = 2\n```\n\n### Output\n```\n[3,3]\n```\n\n### Explanation\nThe subsequence has the largest sum of 3 + 3 = 6.\n\n---\n\n## Incorrect Approach (Buggy)\n```cpp\npriority_queue<int,int> l;\nfor(int i = 0;i < nums.size();i++){\n    l.push(nums[i],i);\n}\n\nvector<int> ans;\nfor(int i = 0;i<k;i++){\n    int t = l.top(); l.pop();\n    ans.push_back(t);\n}\nreturn ans;\n```\n### ❌ Problems\n1. `priority_queue<int,int>` is not valid C++ syntax — it only accepts one template type.  \n   → You must use `priority_queue<pair<int,int>>` to store both value and index.\n2. You lose the **original order** — output is not necessarily a subsequence.\n3. Popping directly from the heap yields elements sorted by value, not by original index.\n\n---\n\n## Correct Approach (Sorting)\n\n### Idea\n1. Pair each number with its index: `(value, index)`.\n2. Sort by value descending, take top `k` elements.\n3. Sort those `k` elements again by index ascending to restore subsequence order.\n4. Extract the values.\n\n### Complexity\n- **Time**: O(n log n)\n- **Space**: O(n)\n\n### Implementation\n```cpp\nclass Solution {\npublic:\n    vector<int> maxSubsequence(vector<int>& nums, int k) {\n        vector<pair<int,int>> a; // {value, idx}\n        a.reserve(nums.size());\n        for (int i = 0; i < (int)nums.size(); ++i) a.push_back({nums[i], i});\n\n        // 依 value 由大到小\n        sort(a.begin(), a.end(), [](const auto& p1, const auto& p2){\n            if (p1.first != p2.first) return p1.first > p2.first;\n            return p1.second < p2.second; // tie-break：較小 index 優先\n        });\n\n        a.resize(k); // 取前 k 個\n\n        // 還原子序列順序：依 index 由小到大\n        sort(a.begin(), a.end(), [](const auto& p1, const auto& p2){\n            return p1.second < p2.second;\n        });\n\n        vector<int> ans;\n        ans.reserve(k);\n        for (auto &p : a) ans.push_back(p.first);\n        return ans;\n    }\n};\n```\n\n---\n\n## Personal Notes\n\n- **錯誤關鍵**：\n  - 以為 `priority_queue<int,int>` 可以直接存索引。\n  - 忘記子序列需保留原順序，結果輸出順序錯亂。\n\n- **正確思路**：\n  - 同時存 `(value, index)`。\n  - 按 value 降序取前 k，再依 index 升序還原順序。\n\n- **學到的概念**：\n  - `priority_queue` 的 template 用法：`priority_queue<T, Container, Compare>`。\n  - Lambda sort 的語法：`[](const auto& a, const auto& b){ ... }`。\n\n---\n\n## Summary\n\n| 步驟 | 操作 | 說明 |\n|------|------|------|\n| 1 | 建立 pair 陣列 | 保存 value + index |\n| 2 | 依 value 由大排小 | 找出前 k 大元素 |\n| 3 | 取前 k 並依 index 由小排大 | 還原子序列順序 |\n| 4 | 輸出 value | 得到答案 |\n\n---\n\n✅ **Key takeaway**: When dealing with “largest k elements that must preserve original order,”  \nyou almost always need to **keep both value and index** and **sort twice**.\n",
    "createdAt": "2025-10-09"
  },
  {
    "id": "leetcode-2138",
    "originalId": 2138,
    "title": "2138. Divide a String Into Groups of Size k",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "String"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/string/2138-divide-a-string-into-groups-of-size-k.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/string/2138-divide-a-string-into-groups-of-size-k.md",
    "markdownContent": "# 2138. Divide a String Into Groups of Size k\n\n## Problem Information\n- **Problem ID**: 2138\n- **Title**: Divide a String Into Groups of Size k\n- **Difficulty**: Easy\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/divide-a-string-into-groups-of-size-k/\n- **Topics**: String, Simulation\n\n---\n\n## Problem Description (brief)\nGiven a string `s`, an integer `k`, and a character `fill`, split `s` into groups of size `k`. If the last group is shorter than `k`, pad it with `fill` characters until its length becomes `k`. Return the groups as a vector of strings (order preserved).\n\n---\n\n## Solutions\n\n### Method A — Incremental Build (your original approach)\n**Idea**: Traverse characters, accumulate into a temporary buffer. Every time the buffer reaches length `k`, push it and clear. After the loop, if the buffer is non-empty, pad it with `fill` up to `k` and push.\n\n**Time Complexity**: O(n)  \n**Space Complexity**: O(n) for the answer (extra O(k) temp buffer)\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    vector<string> divideString(string s, int k, char fill) {\n        vector<string> ans;\n        string tem;\n        tem.reserve(k);\n        for (int i = 0; i < (int)s.size(); ++i) {\n            tem += s[i];\n            if ((int)tem.size() == k) {\n                ans.push_back(tem);\n                tem.clear();\n            }\n        }\n        if (!tem.empty()) {\n            tem.append(k - tem.size(), fill);\n            ans.push_back(tem);\n        }\n        return ans;\n    }\n};\n```\n\n---\n\n### Method B — Pad First, Then Slice (refactor)\n**Idea**: If `|s|` is not a multiple of `k`, append `fill` just once so that its length becomes a multiple of `k`. Then cut `s` into non-overlapping substrings of length `k`. No trailing-buffer logic needed.\n\n**Time Complexity**: O(n)  \n**Space Complexity**: O(n) for the answer (no extra temp buffer)\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    vector<string> divideString(string s, int k, char fill) {\n        if (s.size() % k) s.append(k - s.size() % k, fill); // pad once\n        vector<string> ans;\n        ans.reserve(s.size() / k);\n        for (size_t i = 0; i < s.size(); i += k)\n            ans.emplace_back(s, i, k); // construct substring in place\n        return ans;\n    }\n};\n```\n\n---\n\n## Syntax Spotlight — `if (s.size() % k) s.append(k - s.size() % k, fill);`\n\n### 1) Condition: `s.size() % k`\n- `a % b` is the remainder of dividing `a` by `b`.\n- In C++, any non-zero integer in an `if` condition is treated as **true**.\n- So `if (s.size() % k)` means **“if the length of `s` is NOT divisible by `k`”**.\n\nExample:  \n- `s.size() = 11`, `k = 3` → `11 % 3 = 2` (non-zero) → condition is true.  \n- `s.size() = 12`, `k = 3` → `12 % 3 = 0` (zero) → condition is false.\n\n### 2) Padding amount: `k - s.size() % k`\n- When the condition is true, the remainder `r = s.size() % k` tells you how many characters are **missing** to reach the next multiple of `k`.  \n- Missing count = `k - r`.\n\nContinuing the example:  \n- `|s| = 11`, `k = 3` → `r = 2` → missing `3 - 2 = 1` character.\n\n### 3) The `append` overload: `string::append(size_type count, char ch)`\n- This standard overload appends `count` copies of the character `ch` to the end of the string.  \n- Here: `s.append(k - s.size() % k, fill);` appends exactly the **missing** number of `fill` characters.\n\n### 4) Why this works\n- After padding, `s.size()` becomes a multiple of `k`.  \n- Then we can safely take chunks `[0..k-1]`, `[k..2k-1]`, … without worrying about leftovers.\n\n### 5) Tiny dry-run\n- `s = \"abcdefg\"`, `k = 3`, `fill = 'x'`  \n  - `|s| = 7`, `7 % 3 = 1` → need `3 - 1 = 2` fills.  \n  - After append: `\"abcdefgxx\"` (length 9).  \n  - Slices: `\"abc\"`, `\"def\"`, `\"gxx\"`.\n\n---\n\n## Personal Notes\n- 方法 A（逐步裝箱）可讀性好，容易上手。  \n- 方法 B（先補再切）在程式碼上更**精簡**且易於最佳化（一次 padding + 規律切片）。\n- 小陷阱：注意 `size_t` 與 `int` 混用、`substr` 可能產生拷貝；可用 `emplace_back(s, i, k)` 直接在 vector 中就地建構子字串。\n",
    "createdAt": "2025-10-09"
  },
  {
    "id": "leetcode-2221",
    "originalId": 2221,
    "title": "2221. Find Triangular Sum of an Array",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Array"
    ],
    "description": "Given an integer array nums of length n containing digits 0-9, repeatedly generate a new array by taking the sum of adjacent values modulo 10 until only one element remains. Return that last remaining value.",
    "hasNote": true,
    "noteUrl": "/content/problems/array/2221-find-triangular-sum-of-an-array.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/2221-find-triangular-sum-of-an-array.md",
    "markdownContent": "# 2221. Find Triangular Sum of an Array\n\n## Problem Information\n- **Problem ID**: 2221\n- **Title**: Find Triangular Sum of an Array\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/find-triangular-sum-of-an-array/\n- **Topics**: Array, Simulation\n\n## Problem Description\n\nGiven an integer array nums of length n containing digits 0-9, repeatedly generate a new array by taking the sum of adjacent values modulo 10 until only one element remains. Return that last remaining value.\n\nExample: nums = [1,2,3,4,5] → [3,5,7,9] → [8,2,6] → [0,8] → [8]\n\n## My Solution\n\n```cpp\nclass Solution {\npublic:\n    int triangularSum(vector<int>& nums) {\n        if(nums.size() == 1){\n            return nums[0];\n        }\n\n        vector<int> cal;\n        for(int i=0;i<nums.size();i++){\n            cal.push_back(nums[i]);\n        }\n        while(cal.size() != 1){\n            vector<int> temp;\n            for(int i=0;i < cal.size() - 1;i++){\n                int ac = (cal[i]+cal[i+1] )%10;\n                temp.push_back(ac);\n            }\n\n            cal.clear();\n            for(int i=0;i < temp.size();i++){\n                cal.push_back(temp[i]);\n            }\n        }\n        return cal[0]%10 ;\n    }\n};\n```\n\n## Notes\n\nStraightforward simulation: repeatedly reduce the array by taking adjacent sums mod 10 until one element remains.",
    "createdAt": "2025-10-02"
  },
  {
    "id": "leetcode-2353",
    "originalId": 2353,
    "title": "2353. Design a Food Rating System",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "HashTable"
    ],
    "description": "Design a system to support:",
    "hasNote": true,
    "noteUrl": "/content/problems/hashtable/2353-design-a-food-rating-system.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/hashtable/2353-design-a-food-rating-system.md",
    "markdownContent": "\n# 2353. Design a Food Rating System\n\n## Problem Information\n- **Problem ID**: 2353\n- **Title**: Design a Food Rating System\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/design-a-food-rating-system/\n- **Topics**: Hash Map, Ordered Set, Design\n\n## Problem Description\n\nDesign a system to support:\n1. `changeRating(food, newRating)`: update the rating of a given food.\n2. `highestRated(cuisine)`: return the name of the highest-rated food for the given cuisine; if there is a tie, return the lexicographically smaller name.\n\nYou are given arrays `foods`, `cuisines`, and `ratings` of length `n`, where `foods[i]` is the food name, `cuisines[i]` is its cuisine, and `ratings[i]` is its initial rating.\n\n## Solutions\n\n### Solution 1: HashMap + Ordered Set per Cuisine\n**Time Complexity**: \n- Initialization: O(n log n)\n- `changeRating`: O(log n) per update\n- `highestRated`: O(1) to read `begin()` (amortized; the ordered set maintains ordering)\n\n**Space Complexity**: O(n) for maps and ordered sets\n\n**Key Idea**: \n- Maintain `food -> (cuisine, rating)` in an `unordered_map` for O(1) lookups during updates.\n- For each cuisine, maintain an ordered `set` of pairs `(-rating, name)` so that the **best** item is at `begin()` (highest rating; ties broken by lexicographically smaller name).  \n- On rating change: remove the old pair, update the map, insert the new pair.\n\n#### Code\n```cpp\n#include <string>\n#include <vector>\n#include <unordered_map>\n#include <set>\nusing namespace std;\n\nclass FoodRatings {\npublic:\n    // food -> (cuisine, rating)\n    unordered_map<string, pair<string,int>> info;\n    // cuisine -> ordered set of (-rating, name)\n    unordered_map<string, set<pair<int,string>>> byCuisine;\n\n    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {\n        int n = (int)foods.size();\n        info.reserve(n * 2);\n        for (int i = 0; i < n; ++i) {\n            info[foods[i]] = {cuisines[i], ratings[i]};\n            byCuisine[cuisines[i]].insert({-ratings[i], foods[i]});\n        }\n    }\n\n    void changeRating(string food, int newRating) {\n        auto &pr = info[food];         // pr.first = cuisine, pr.second = oldRating\n        const string &c = pr.first;\n        int oldRating = pr.second;\n\n        auto &S = byCuisine[c];\n        S.erase({-oldRating, food});   // remove old record\n        pr.second = newRating;         // update rating\n        S.insert({-newRating, food});  // insert new record\n    }\n\n    string highestRated(string cuisine) {\n        const auto &S = byCuisine[cuisine];\n        // set is ordered by (-rating, name) ascending; begin() gives highest rating & lexicographically smallest name\n        return S.begin()->second;\n    }\n};\n```\n\n### Solution 2: HashMap + Priority Queue with Lazy Deletion (Optional)\n**Time Complexity**: \n- `changeRating`: O(log n) (push a new entry)\n- `highestRated`: amortized O(log n) (pop stale entries until top is valid)\n\n**Space Complexity**: O(n)\n\n**Idea**: Keep a `priority_queue` per cuisine storing `(rating, name, version)` and a hash map for current `(cuisine, rating)`; during query, pop outdated entries (lazy deletion). Slightly more code, similar complexity; ordered set is cleaner for strict ordering.\n\n## Personal Notes\n這是我第一次寫系統設計的部分。正確的做法是先確認需要的操作（初始化、更新、查詢），再決定資料結構與維護方式。這題的關鍵是把需求拆成兩個索引：\n- 以食物名稱查 `(cuisine, rating)`（用 `unordered_map`）\n- 以菜系查「最高分、同分字典序最小」（用 per-cuisine 的 ordered `set` 存 `(-rating, name)`）\n\n更新時遵守「先刪舊、後插新」的不變量，確保集合內容與當前評分同步。這題本質是把 DSA 組件（hash + ordered set + key 設計）組裝成可維護的系統。\n",
    "createdAt": "2025-10-05"
  },
  {
    "id": "leetcode-2598",
    "originalId": 2598,
    "title": "2598. Smallest Missing Non-negative Integer After Operations",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Array",
      "Hash Table",
      "Math"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/array/2598-smallest-missing-after-operations.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/2598-smallest-missing-after-operations.md",
    "markdownContent": "# 2598. Smallest Missing Non-negative Integer After Operations — 筆記（最大化 MEX）\n\n> **題意摘要**\n> 給定整數陣列 `nums` 與整數 `value`。一次操作可對任一元素加上或減去 `value`（可無限次）。\n> **MEX** 定義為陣列中**最小**的**未出現**之**非負整數**。目標：經過任意多次操作後，回傳**最大可能的 MEX**。\n\n## 1) 核心觀念（餘數分桶）\n\n- 對任意整數 `x`，若重複加/減 `value`，其 **mod `value` 的餘數**不變（`x ≡ x ± k*value (mod value)`）。  \n- 因此每個數只能落在**固定的餘數類**上。令 `r = ((x % value) + value) % value` 將餘數規範到 `[0, value-1]`。  \n- 把 `nums` 依餘數 `r` 分桶，數量記為 `cnt[r]`。接著我們從 `x = 0` 開始**依序填滿** `0,1,2,3,...`：\n  - 需要填 `x` 時，必須從 **餘數類 `r = x % value`** 取出一個數來「對齊」到 `x`（藉由加減 `value`）。\n  - 若 `cnt[r] > 0`，則能填 `x`，並做 `cnt[r]--`，繼續 `x+1`。  \n  - 若 `cnt[r] == 0`，代表**無法填 `x`**，因此當前 `x` 即為最大可達的 **MEX**。\n\n> 直觀理解：每個餘數桶供應該桶索引（`r`）對應的序列位置 `r, r+value, r+2*value, ...`。當某桶用完，該序列上的下一個位置就無法被填上。\n\n---\n\n## 2) 你的原本想法 vs. 修正點\n\n- 你原本的想法：「只要每個餘數類都出現過一次，MEX 就會是第一個未出現的餘數索引」——**錯在忽略供應需要持續扣用**。  \n- 因為填 `0,1,2,3,...` 時，**同一餘數類會被反覆使用**（對應 `x = r, r+value, r+2*value, ...`）。  \n- 正確做法：**每填一個 `x` 就把 `cnt[x % value]--`**；當某次遇到 `cnt[x % value] == 0` 時，**立刻回傳 `x`**。\n\n---\n\n## 3) 正確性草證\n\n- 對每個 `x`，只有 `x % value` 這個餘數類能供應它。  \n- 若該桶還有存量，就能把某個原始屬於這個餘數類的數經由加/減 `value` 移到 `x`；否則無法填。  \n- 自小到大貪心填充，一旦遇到某個 `x` 無法填，**更大的數更不可能先被填**，因此此時的 `x` 即為最大可達 MEX。\n\n---\n\n## 4) 演算法步驟（O(n)）\n\n1. 計數各餘數類：`r = ((num % value) + value) % value`，`cnt[r]++`。  \n2. 令 `x = 0`，循環：\n   - `r = x % value`；若 `cnt[r] > 0` → `cnt[r]--` 並 `x++`；否則回傳 `x`。\n\n**時間複雜度**：`O(n)`（計數一次 + 線性遞增 `x` 至 MEX）  \n**空間複雜度**：`O(value)`（餘數桶）\n\n---\n\n## 5) 你的 C++ 程式（修正版，保留原風格）\n\n```cpp\nclass Solution {\npublic:\n    int findSmallestInteger(vector<int>& nums, int value) {\n        int n = (int)nums.size();\n        vector<int> cnt(value, 0);\n\n        // 將負數餘數規範到 [0, value-1]\n        for (int i = 0; i < n; ++i) {\n            int r = ((nums[i] % value) + value) % value;\n            cnt[r]++;\n        }\n\n        int x = 0;\n        while (true) {\n            int r = x % value;\n            if (cnt[r] > 0) {\n                cnt[r]--;\n                ++x;\n            } else {\n                return x; // 第一個無法被對齊的 x，即最大 MEX\n            }\n        }\n    }\n};\n```\n\n> 註：`vector<int> mo(n, 0);` 在最終解法中可省略（除非你要保留中間餘數紀錄）。\n\n---\n\n## 6) 常見坑點\n\n- **負數取餘**：務必用 `((num % value) + value) % value`。  \n- **誤把「是否出現過」當成判準**：不是只看是否出現一次，而是需要**重複消耗**。  \n- **溢位/邏輯**：`x` 會逐步增加，但不可能超過 `n + value` 太多（因為每步都要消耗一個桶、最多消耗 `n` 次）。\n\n---\n\n## 7) 範例驗證\n\n- `nums = [1,-10,7,13,6,8], value = 5`  \n  - 餘數（mod 5）：`[1, 0, 2, 3, 1, 3]` → `cnt = [1,2,1,2,0]`  \n  - 填 `x=0`：要 `r=0` → `cnt[0]=1→0`  \n  - 填 `x=1`：要 `r=1` → `cnt[1]=2→1`  \n  - 填 `x=2`：要 `r=2` → `cnt[2]=1→0`  \n  - 填 `x=3`：要 `r=3` → `cnt[3]=2→1`  \n  - 填 `x=4`：要 `r=4` → `cnt[4]=0` → 卡住，因此 **MEX=4**（與題解一致）。\n\n---\n\n### 一句話總結\n把數字按餘數分桶；從 0 起依序填滿 `x`，每次消耗 `cnt[x % value]`。遇到空桶即回傳當前 `x`，就是最大化後的 MEX。\n",
    "createdAt": "2025-10-28"
  },
  {
    "id": "leetcode-3147",
    "originalId": 3147,
    "title": "3147. Taking Maximum Energy From the Mystic Dungeon — 筆記（v2）",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "DynamicProgramming"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/dynamicprogramming/3147-taking-maximum-energy.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/dynamicprogramming/3147-taking-maximum-energy.md",
    "markdownContent": "# 3147. Taking Maximum Energy From the Mystic Dungeon — 筆記（v2）\n\n> **題意速記**：給定 `energy` 與整數 `k`。從任一起點 `i` 出發，必須吸收 `energy[i]`，並瞬移到 `i+k`，重複直到超出陣列；沿途能量可正可負，**不可中途停**。求最大總能量。\n\n---\n\n## 一、核心觀念\n- 把陣列依索引的餘數 `r = i % k` 分成 **k 條互不相交的「鏈」**：  \n  第 `r` 條鏈為 `r, r+k, r+2k, ...`。\n- 從任一起點 `i` 出發的總能量，就是它所在鏈上 **從 `i` 到終點** 的**固定後綴和**（不能跳過）。\n- 因此，對每條鏈做一次 **自尾向前** 的累加，就能在 **O(n)** 內算出所有起點的值並取最大。\n\n---\n\n## 二、你的兩個版本（原樣保留）\n\n### 1) TLE 版本（暴力重複累加，時間 O(n · ⌈n/k⌉)）\n```cpp\n// every k is a loop to the end\n// from the end to front and add\nint ans = -10000;\nint n = energy.size();\nfor(int i = n - 1; i >= 0 ; --i){\n    int tra = i;\n    int sum = 0;\n    while(tra <= n -1 ){\n        sum += energy[tra];\n        tra += k;\n    }\n    if(sum > ans){\n        ans = sum;\n    }\n}\nreturn ans;\n```\n**為什麼 TLE？**  \n對每個起點 `i` 都重新計算 `i, i+k, i+2k, ...` 的和，導致大量重複加法。\n\n---\n\n### 2) 正確版本（O(n)）：自尾向前累加每條鏈\n```cpp\nint n = energy.size();\nint ans = -10000;\nfor(int i = k; i > 0 ; --i){\n    int whe = n - 1 - (k - i);\n    int sum = 0;\n    while(whe >= 0){\n        sum += energy[whe];\n        if(sum > ans){\n            ans = sum;\n        }\n        whe -= k;\n    }\n}\nreturn ans;\n```\n**為什麼快？**  \n把陣列拆成 `k` 條鏈，針對每條鏈**只累加一次**（從尾到頭），等價於同時計算所有起點的「固定後綴和」，整體 **O(n)**。\n\n---\n\n## 三、等價寫法：以餘數類別 `r = 0..k-1` 表示（語義更清楚）\n```cpp\n// 等價寫法（語義化）：以餘數 r 分鏈，從每條鏈的最後一個索引往回加\n#include <bits/stdc++.h>\nusing namespace std;\n\nlong long maximumEnergy_residue(vector<int>& energy, int k) {\n    int n = (int)energy.size();\n    long long ans = LLONG_MIN;   // 安全初始化\n    for (int r = 0; r < k; ++r) {\n        long long sum = 0;\n        // 找到餘數為 r 的最後一個索引 start\n        int start = ((n - 1 - r) >= 0) ? ((n - 1 - r) / k) * k + r : -1;\n        for (int j = start; j >= 0; j -= k) {\n            sum += energy[j];\n            ans = max(ans, sum);\n        }\n    }\n    return ans;\n}\n```\n- `start` 是該餘數類別的**最後**一個位置，然後以步長 `k` 向前走。\n- `sum` 為該鏈的固定後綴和；每次更新全域 `ans`。\n\n---\n\n## 四、**安全版可提交實作**（`long long` + 邊界處理）\n```cpp\nclass Solution {\npublic:\n    int maximumEnergy(vector<int>& energy, int k) {\n        int n = (int)energy.size();\n        long long best = LLONG_MIN; // 避免 -10000 這種不保險的值\n        for (int r = 0; r < k; ++r) {\n            long long sum = 0;\n            // 餘數 r 的最後一個索引\n            int start = ((n - 1 - r) >= 0) ? ((n - 1 - r) / k) * k + r : -1;\n            for (int j = start; j >= 0; j -= k) {\n                sum += (long long)energy[j];\n                if (sum > best) best = sum;\n            }\n        }\n        // LeetCode 函式回傳型別是 int，題目資料範圍允許強轉\n        return (int)best;\n    }\n};\n```\n**說明**\n- 以 `long long` 累加，避免可能的整數溢位。\n- 用 `LLONG_MIN` 做初始化，正負都安全。\n- 直接依餘數類別走訪，語意比「從尾部往回數 k 次」更清楚。\n\n---\n\n## 五、複雜度 & 常見陷阱\n- **時間**：`O(n)`（每個索引最多被加一次）。  \n- **空間**：`O(1)` 額外空間。\n\n**陷阱**\n1. 不可用 `max(0, …)` 等做法「截斷負數」：題目規定**必須吸收**，不能中途停。\n2. `ans` 初始化用 `-10000` 不安全；應改 `INT_MIN` 或 `LLONG_MIN`。\n3. 當 `k > n`，有效鏈不超過 `n` 條；寫法以餘數類別自動處理好。\n4. 交題前記得移除 `cout` 等除錯輸出。\n\n---\n\n## 六、微型測試（手推）\n- `energy = [5, -2, 3, -1, 2], k = 2`  \n  - 鏈 0：索引 `[0, 2, 4]` → 後綴和：  \n    - 從 4：`2`  \n    - 從 2：`3 + 2 = 5`  \n    - 從 0：`5 + 5 = 10` → **最佳 10**\n  - 鏈 1：索引 `[1, 3]`：  \n    - 從 3：`-1`  \n    - 從 1：`-2 + (-1) = -3`\n\n---\n\n## 七、一句話總結\n> **把陣列切成 `k` 條「餘數鏈」，每條鏈做一次自尾向前的固定後綴和，答案取全域最大值。** 這是本題的最優線性解法。\n",
    "createdAt": "2025-10-13"
  },
  {
    "id": "leetcode-3350",
    "originalId": 3350,
    "title": "3350. Adjacent Increasing Subarrays Detection II",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Array",
      "Greedy",
      "Sliding Window"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/array/3350-adjacent-increasing-subarrays-ii.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/3350-adjacent-increasing-subarrays-ii.md",
    "markdownContent": "# 3350. Adjacent Increasing Subarrays Detection II — 筆記（O(n) 解法）\n\n> **主旨**：找出最大 `k`，使得存在兩段**相鄰**、各長度為 `k` 的子陣列，且兩段都**嚴格遞增**。相鄰表示右段起點 `b = a + k`。\n\n## 1. 關鍵觀念\n\n- 定義兩個輔助陣列：\n  - `L[i]`：**以 `i` 結尾** 的嚴格遞增連續段長度。\n  - `R[i]`：**以 `i` 開頭** 的嚴格遞增連續段長度。\n\n- 對於每個分界（邊界） `i | i+1`：\n  - 左段最多能取到的長度受 `L[i]` 限制。\n  - 右段最多能取到的長度受 `R[i+1]` 限制。\n  - 兩段都要長度 ≥ `k`，因此該分界能達到的 **最大 `k` = `min(L[i], R[i+1])`**。\n\n- 最終答案：\n  \\[\n  \\text{ans} = \\max_{i=0}^{n-2} \\; \\min\\big(L[i], R[i+1]\\big).\n  \\]\n\n---\n\n## 2. 為什麼可行？（直覺）\n\n- `L[i] = x` 表示左邊在 `i` 結尾至少可以向左延伸 `x` 長度的嚴格遞增段；`R[i+1] = y` 表示右邊在 `i+1` 開頭至少可以向右延伸 `y` 長度。\n- 兩段要同時長度為 `k`，就被較短的那一段限制，因此分界 `i` 的可行長度上限是 `min(x, y)`。\n- 在所有分界中取最大值，即為題目要求的最大 `k`。\n\n---\n\n## 3. 建表方式（O(n) 線性掃描）\n\n- **建 `L`**（遞增段以 `i` 結尾）：\n  - 初值 `L[0] = 1`；\n  - 若 `nums[i-1] < nums[i]`，則 `L[i] = L[i-1] + 1`；否則重置為 `1`。\n\n- **建 `R`**（遞增段以 `i` 開頭）：\n  - 初值 `R[n-1] = 1`；\n  - 自右向左：若 `nums[i] < nums[i+1]`，則 `R[i] = R[i+1] + 1`；否則重置為 `1`。\n\n- **統合答案**：掃過 `i = 0..n-2`，對每個分界取 `min(L[i], R[i+1])` 的最大值。\n\n---\n\n## 4. 極簡偽碼（語言無關）\n\n```text\nbuild L:\n  L[0] = 1\n  for i = 1..n-1:\n    if nums[i-1] < nums[i]: L[i] = L[i-1] + 1\n    else:                   L[i] = 1\n\nbuild R:\n  R[n-1] = 1\n  for i = n-2..0:\n    if nums[i] < nums[i+1]: R[i] = R[i+1] + 1\n    else:                   R[i] = 1\n\nans = 0\nfor i = 0..n-2:  # 分界在 i | i+1\n  ans = max(ans, min(L[i], R[i+1]))\n\nreturn ans\n```\n\n---\n\n## 5. 參考 C++17 實作（O(n) 時間 / O(n) 空間）\n\n> 若你只想看重點：`L` 與 `R` 兩趟線掃，最後掃一次分界取 `min` 的最大值。\n\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxIncreasingSubarrays(vector<int>& nums) {\n        int n = (int)nums.size();\n        if (n < 2) return 0;\n\n        vector<int> L(n, 1), R(n, 1);\n\n        // L[i]: length of strictly increasing run ending at i\n        for (int i = 1; i < n; ++i) {\n            if (nums[i - 1] < nums[i]) L[i] = L[i - 1] + 1;\n        }\n        // R[i]: length of strictly increasing run starting at i\n        for (int i = n - 2; i >= 0; --i) {\n            if (nums[i] < nums[i + 1]) R[i] = R[i + 1] + 1;\n        }\n\n        int ans = 0;\n        for (int i = 0; i + 1 < n; ++i) {\n            // 分界在 i 與 i+1 之間\n            ans = max(ans, min(L[i], R[i + 1]));\n        }\n        return ans;\n    }\n};\n```\n\n**時間複雜度**：`O(n)`（三次線性掃描）  \n**空間複雜度**：`O(n)`（儲存 `L` 與 `R`）\n\n---\n\n## 6. 注意事項（常見坑）\n\n- **嚴格遞增**：比較必須用 `<`，不能用 `<=`。\n- **分界範圍**：只需考慮 `i = 0..n-2`，因為分界在 `i | i+1`。\n- **邊界長度**：`n < 2` 直接回傳 `0`（無法形成兩段）。\n- **Off-by-one**：組合答案時別寫成 `min(L[i], R[i])`，右段應從 `i+1` 開始。\n\n---\n\n## 7. 小範例（手算感）\n\n- `nums = [1, 2, 3, 1, 2, 3, 4]`  \n  - 遞增段：`[1,2,3]`、`[1,2,3,4]`  \n  - 分界在索引 `2 | 3`：`L[2] = 3`、`R[3] = 4` → 這個分界的最大 `k = min(3,4) = 3`。  \n  - 其他分界可能更小，整體答案為 `3`。\n\n---\n\n## 8. 延伸思考（Binary Search on Answer）\n\n- 也能用「答案二分」：定義可行性 `F(k)` 是否存在某分界使 `L[i] ≥ k` 且 `R[i+1] ≥ k`。  \n- `F(k)` 具 **單調性**（`k` 越小越容易成立），可二分最大可行 `k`。  \n- 本題因為有更簡潔的 `O(n)` 直接做法，二分不是必要但可作為模板練習。\n\n---\n\n**一句話總結**：先線性建出每點左/右的嚴格遞增連續段長度，然後在每個分界取兩側長度的 `min`，全域取 `max` 即得最大相鄰嚴格遞增子陣列長度 `k`。\n",
    "createdAt": "2025-10-28"
  },
  {
    "id": "leetcode-3494",
    "originalId": 3494,
    "title": "3494. Find the Minimum Amount of Time to Brew Potions — 詳細筆記",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Greedy"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/greedy/3494-brew-potions-note.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/greedy/3494-brew-potions-note.md",
    "markdownContent": "# 3494. Find the Minimum Amount of Time to Brew Potions — 詳細筆記\n\n> 題目連結：<https://leetcode.com/problems/find-the-minimum-amount-of-time-to-brew-potions/>  \n> 類型：No‑Wait Flow Shop（無等待流水線）、模擬、前綴技巧（時間鏈回推）  \n> 關鍵：每瓶藥水在每位巫師處理完後**必須立刻**交給下一位巫師（不能等、不能提前），要求最短完工時間。\n\n---\n\n## 一、題意重述（白話）\n- 有 `n` 位巫師（wizards），`m` 瓶藥水（potions）。每瓶藥必須 **依序** 經過所有巫師（0 → 1 → … → n‑1）。\n- 第 `i` 位巫師處理第 `j` 瓶藥的時間為 `skill[i] * mana[j]`（比例型 processing time）。\n- **無等待（No‑Wait）約束**：一瓶藥在巫師 `i` 做完後，必須**立刻**被巫師 `i+1` 開始處理；整條管線完全對齊。\n\n**目標**：求所有藥水都釀完的最短時間（最後一位巫師處理完最後一瓶藥的時間戳）。\n\n---\n\n## 二、核心觀念\n把「上一瓶已完成後，每位巫師能接下一瓶的**最早空檔時間**」記為 `f[i]`。  \n每當來一瓶新藥（`x = mana[j]`）時，我們要在**無等待**條件下，把它從巫師 0 串到巫師 n‑1。\n\n### Hint 1（狀態）\n- `f[i]`：第 `i` 位巫師對「上一瓶藥」的**最早空檔時間**。初始 `f[i] = 0`。\n\n### Hint 2（前向傳遞，對齊鏈路）\n- 設 `x = mana[j]`。從 `now = f[0]` 開始，沿著巫師鏈前推：\n  - 對 `i = 1..n-1`：\n    ```\n    now = max(now + skill[i-1] * x, f[i])\n    ```\n    - `now + skill[i-1] * x`：這瓶藥從前一位巫師做完、**抵達**第 `i` 位巫師的時刻\n    - `f[i]`：第 `i` 位巫師目前可開始的最早空檔\n    - 取 `max` 可確保**不早不晚**正好接上（No‑Wait）\n  - 最後：\n    ```\n    f[n-1] = now + skill[n-1] * x   // 最後一位巫師完成這瓶的時間\n    ```\n\n### Hint 3（反向回填，更新空檔）\n- 完成時間已知後，依 No‑Wait 性質，「第 i+1 位巫師開始這瓶」=「第 i 位巫師**剛完成**這瓶」。\n- 因此可由尾往前回推各巫師的完成時間（亦即**新**空檔）：\n  ```\n  for i = n-2 .. 0:\n      f[i] = f[i+1] - skill[i+1] * x\n  ```\n- 如此一來，`f` 就代表「**處理完這瓶後**，每位巫師的最早空檔時間」，可供下一瓶使用。\n\n> 最後答案即為 `f[n-1]`：最後一位巫師完成最後一瓶藥的時間。\n\n---\n\n## 三、步驟範例（完整走表）\n`skill = [1,5,2,4]`，`mana = [5,1,4,2]`  \n初始化：`f = [0,0,0,0]`（大家都空）\n\n### (1) x = 5\n前向：  \n- now= f0=0  \n- i=1: `max(0+1*5=5, f1=0)=5`  \n- i=2: `max(5+5*5=30, f2=0)=30`  \n- i=3: `max(30+2*5=40, f3=0)=40`  \n→ `f3 = 40 + 4*5 = 60`  \n反向：  \n- `f2 = 60 - 4*5 = 40`  \n- `f1 = 40 - 2*5 = 30`  \n- `f0 = 30 - 5*5 = 5`  \n得到：`f = [5, 30, 40, 60]`\n\n### (2) x = 1\n前向：  \n- now=5 → i=1: max(6,30)=30 → i=2: max(35,40)=40 → i=3: max(42,60)=60  \n→ `f3 = 60 + 4 = 64`  \n反向：  \n- `f2=64-4=60` → `f1=60-2=58` → `f0=58-5=53`  \n得到：`f = [53, 58, 60, 64]`\n\n### (3) x = 4\n前向：  \n- now=53 → i=1: max(57,58)=58 → i=2: max(78,60)=78 → i=3: max(86,64)=86  \n→ `f3 = 86 + 16 = 102`  \n反向：  \n- `f2=102-16=86` → `f1=86-8=78` → `f0=78-20=58`  \n得到：`f = [58, 78, 86, 102]`\n\n### (4) x = 2\n前向：  \n- now=58 → i=1: max(60,78)=78 → i=2: max(88,86)=88 → i=3: max(92,102)=102  \n→ `f3 = 102 + 8 = 110`  \n（最後一瓶，反向可省）\n\n**答案**：`110` ✅\n\n---\n\n## 四、正確性直覺\n- 前向 `max(...)`：確保每位巫師接手時刻 **≥** 自身空檔、且 **=** 上一位巫師完成當下（No‑Wait）。\n- 反向回填：把這瓶藥在每位巫師的開始/完成時間鏈條**嚴格接起來**，令 `f` 成為處理完本瓶後的**新空檔表**。  \n- 每瓶做一次「前向對齊 + 反向回填」，即可得到最短可行的無等待時程。\n\n---\n\n## 五、實作（C++，O(n·m) 時間 / O(n) 空間）\n```cpp\nclass Solution {\npublic:\n    long long minTime(vector<int>& skill, vector<int>& mana) {\n        int n = (int)skill.size();\n        int m = (int)mana.size();\n        vector<long long> f(n, 0); // f[i]: earliest free time after last processed potion\n\n        for (int j = 0; j < m; ++j) {\n            long long x = mana[j];\n\n            // Hint 2: forward pass (align no-wait chain for this potion)\n            long long now = f[0];\n            for (int i = 1; i < n; ++i) {\n                now = max(now + 1LL * skill[i - 1] * x, f[i]);\n            }\n            f[n - 1] = now + 1LL * skill[n - 1] * x;\n\n            // Hint 3: backward pass (reconstruct exact finish times for all wizards)\n            for (int i = n - 2; i >= 0; --i) {\n                f[i] = f[i + 1] - 1LL * skill[i + 1] * x;\n            }\n        }\n        return f[n - 1];\n    }\n};\n```\n\n### 複雜度\n- 時間：`O(n·m)`（每瓶藥一次前向 + 一次反向）\n- 空間：`O(n)`\n\n---\n\n## 六、替代視角：以相鄰瓶的最小啟動間隔（δ）求總時間\n若定義技能前綴和 `A[q] = sum_{t=0..q-1} skill[t]`，對每對相鄰藥 `(j, j+1)`，\n嚴格無等待所需的最小間隔為：\n```\nδ_j = max_{1 <= q <= n} ( A[q] * mana[j] - A[q-1] * mana[j+1] )\n```\n總時間 = `sum(δ_j for j=0..m-2) + A[n] * mana[m-1]`。  \n這與上面的「前向 + 反向」做法等價。實務上採用 Hint 流程較直觀。\n\n---\n\n## 七、常見坑點\n- ❌ 把它當一般 Flow Shop（允許等待）→ 會低估時間。  \n- ❌ 建大矩陣 `time[i][j]` 再做 2D DP，容易把 i/j 顛倒；且那是「允許等待」模型。  \n- ✅ 使用 `long long`，避免乘積溢位（`skill * mana` 可能很大）。\n\n---\n\n## 八、測試用例\n- `skill = [1,5,2,4]`，`mana = [5,1,4,2]` → `110`  \n- 單瓶/單人邊界：\n  - `skill=[a]`, `mana=[b1,b2,...]` → 逐瓶累加 `a*bi`；答案就是前綴和。  \n  - `skill=[a1,a2,...]`, `mana=[b]` → 累加 `ai*b`；答案也是前綴和。\n\n---\n\n### 結論\n本題是無等待流水線的最短完工時間，利用「每輪前向對齊 + 反向回填」即可在 `O(n·m)` 內正確求解；  \n其本質與相鄰瓶最小啟動間隔（δ）法一致。",
    "createdAt": "2025-10-09"
  },
  {
    "id": "leetcode  -74",
    "originalId": 74,
    "title": "74. Search a 2D Matrix",
    "difficulty": "Medium",
    "source": "LeetCode  ",
    "topics": [
      "BinarySearch"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/binarysearch/74-search-a-2d-matrix.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/binarysearch/74-search-a-2d-matrix.md",
    "markdownContent": "# 74. Search a 2D Matrix\n\n## Problem Information\n- **Problem ID**: 74  \n- **Title**: Search a 2D Matrix  \n- **Difficulty**: Medium  \n- **Source**: LeetCode  \n- **Link**: [https://leetcode.com/problems/search-a-2d-matrix/?envType=problem-list-v2&envId=plakya4j](https://leetcode.com/problems/search-a-2d-matrix/?envType=problem-list-v2&envId=plakya4j)\n- **Topics**: Binary Search, Matrix\n\n## Problem Description\nYou are given an `m x n` integer matrix with the following properties:\n1. Each row is sorted in non-decreasing order.  \n2. The first integer of each row is greater than the last integer of the previous row.  \n\nGiven an integer `target`, return `true` if `target` is in matrix or `false` otherwise.\n\nYou must write a solution in **O(log(m * n))** time complexity.\n\n---\n\n## Solutions\n\n### Solution 1: Binary Search on Flattened Matrix\n**Idea**:  \nBecause the matrix is globally sorted (each row continues from the previous one),  \nwe can treat the entire matrix as a **flattened sorted array** of size `m * n`.  \nPerform a single binary search, and map the 1D index back to 2D coordinates.\n\n- **Index → Coordinates Mapping**:  \n  ```\n  row = mid / n\n  col = mid % n\n  ```\n  This works because row changes every n elements, while col cycles from 0 to n−1.\n\n**Time Complexity**: O(log(m * n))  \n**Space Complexity**: O(1)\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        int m = matrix.size(), n = matrix[0].size();\n        int left = 0, right = m * n - 1;\n\n        while (left <= right) {\n            int mid = (left + right) / 2;\n            int val = matrix[mid / n][mid % n]; // Map 1D index → 2D position\n\n            if (val == target) return true;\n            else if (val < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return false;\n    }\n};\n```\n\n---\n\n## Personal Notes\n- 關鍵觀念：  \n  這個矩陣等價於一個**完全展開的嚴格遞增一維陣列**，  \n  因此可以直接在整體上進行二分搜尋，不需要先找哪一行。  \n- 核心轉換：  \n  - 行（row）＝ `mid / n`  \n  - 列（col）＝ `mid % n`  \n- 若改用「逐行判斷再二分」，會變成 O(m + log n)，**不符合 O(log(m*n)) 要求**。  \n- 小技巧：對矩陣進行「概念性展開」思考時，能快速判斷哪些題目能用 binary search。\n",
    "createdAt": "2025-10-09"
  },
  {
    "id": "leetcode daily question (2025-10-08)-2300",
    "originalId": 2300,
    "title": "2300. Successful Pairs of Spells and Potions",
    "difficulty": "Medium",
    "source": "LeetCode Daily Question (2025-10-08)",
    "topics": [
      "BinarySearch"
    ],
    "description": "You are given two positive integer arrays `spells` and `potions` of lengths `n` and `m` respectively, ",
    "hasNote": true,
    "noteUrl": "/content/problems/binarysearch/2300-successful-pairs-of-spells-and-potions.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/binarysearch/2300-successful-pairs-of-spells-and-potions.md",
    "markdownContent": "# 2300. Successful Pairs of Spells and Potions\n\n## Problem Information\n- **Problem ID**: 2300\n- **Title**: Successful Pairs of Spells and Potions\n- **Difficulty**: Medium\n- **Source**: LeetCode Daily Question (2025-10-08)\n- **Link**: https://leetcode.com/problems/successful-pairs-of-spells-and-potions/\n- **Topics**: Binary Search, Sorting, Two Pointers\n\n---\n\n## Problem Description\n\nYou are given two positive integer arrays `spells` and `potions` of lengths `n` and `m` respectively, \nwhere `spells[i]` represents the strength of the `i`‑th spell and `potions[j]` represents the strength of the `j`‑th potion.\n\nYou are also given an integer `success`.\n\nA spell and potion pair is considered **successful** if the product of their strengths is **at least success**.\n\nReturn an integer array `pairs` of length `n` where `pairs[i]` is the **number of potions that will form a successful pair** with the `i`‑th spell.\n\n---\n\n## Solutions\n\n### Solution 1: Binary Search + Sorting\n**Idea**:  \nFor each spell, we need to find the smallest potion that makes  \n`spell * potion >= success`.  \nLet that potion’s value be `threshold = ceil(success / spell)`.\n\nBecause potions are sorted, we can binary‑search the **first position** in `potions` that is `>= threshold`, \nand count how many potions are from that position to the end.\n\n**Time Complexity**: O((n + m) log m)  \n**Space Complexity**: O(1)\n\n#### Correct Implementation\n```cpp\nclass Solution {\npublic:\n    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {\n        vector<int> ans;\n        sort(potions.begin(), potions.end());\n\n        for (int i = 0; i < (int)spells.size(); ++i) {\n            // 使用 long long 避免 overflow\n            long long w = ((long long)success + spells[i] - 1) / spells[i];\n\n            int a = bs(potions, w);  // ✅ 改成接收 long long threshold\n\n            if (a == (int)potions.size()) {\n                ans.push_back(0);\n            } else {\n                ans.push_back((int)potions.size() - a);\n            }\n        }\n\n        return ans;\n    }\n\nprivate:\n    // ✅ 將 threshold 型別改為 long long，並在比較時升型\n    int bs(const vector<int>& potions, long long n) {\n        int l = 0, r = (int)potions.size() - 1;\n\n        while (l < r) {\n            int mid = (l + r) / 2;\n\n            if ((long long)potions[mid] >= n)\n                r = mid;      // mid 可能是答案，收縮右界\n            else\n                l = mid + 1;  // mid 太小，往右找\n        }\n\n        // 跑完時 l == r，檢查是否符合條件\n        if (l < (int)potions.size() && (long long)potions[l] >= n)\n            return l;\n        else\n            return (int)potions.size(); // 找不到任何 >= threshold 的元素\n    }\n};\n```\n\n---\n\n### Solution 2: Naïve Brute Force (for understanding only)\n**Time Complexity**: O(n × m) — too slow for large inputs.\n\n```cpp\n/*\nvector<int> ans;\nsort(potions.begin(),potions.end());\nfor(int i = 0;i < spells.size(); ++i){\n    for(int j = 0 ; j < potions.size(); ++ j){\n        if((long long)potions[j] * spells[i] >= success){\n            ans.push_back(potions.size()-j);\n            break;\n        }\n        if(j == potions.size()-1){\n            ans.push_back(0);\n        }\n    }\n}\nreturn ans;\n*/\n```\n\n---\n\n## Personal Notes\n\n- ✅ **核心邏輯自己想出來**：先找到這個 `spell` 下的最小 `potion` 值（`threshold = ceil(success / spell)`），\n  然後在排序後的陣列中找到第一個 `>= threshold` 的位置，用總長減去索引就是成功的數量。\n\n- ⚠️ 被 `long long` 搞到錯誤：`success` 可高達 `1e10`，用 `int` 會溢位。  \n  解法是把 `success`、`threshold`、以及比較都改用 `long long`。\n\n- 🚀 與暴力解相比：原本的 O(n×m) 雙迴圈太慢，改成 **排序 + 二分搜尋**，\n  每次搜尋 O(log m)，總複雜度 O((n + m) log m)。\n\n- 🔍 關鍵思維：\n  - sort potions once.\n  - for each spell → compute smallest needed potion → binary search that index → count from there to end.\n\n---\n\n## Example\n\n### Input\n```\nspells = [5,1,3]\npotions = [1,2,3,4,5]\nsuccess = 7\n```\n\n### Output\n```\n[4,0,3]\n```\n\n### Explanation\n- spell=5 → threshold=2 → valid potions = [2,3,4,5] → 4\n- spell=1 → threshold=7 → none → 0\n- spell=3 → threshold=3 → valid potions = [3,4,5] → 3\n\n---\n\n## Takeaway\n- **Pattern:** Binary Search for \"first element ≥ target\" (Lower Bound)\n- **Formula:** `ceil(success / spell)` → `(success + spell - 1) / spell`\n- **Trick:** Watch for overflow → use `long long`\n- **Complexity:** O((n + m) log m)\n",
    "createdAt": "2025-10-09"
  }
];

export const TOPICS = [
  "Array",
  "LinkedList",
  "Tree",
  "String",
  "Math",
  "HashTable",
  "BFS",
  "DFS",
  "DynamicProgramming",
  "Greedy",
  "Backtracking",
  "BinarySearch",
  "TwoPointers",
  "SlidingWindow",
  "Sort",
  "Stack",
  "Queue",
  "Graph",
  "BitManipulation"
];

export const SOURCES = [
  "LeetCode",
  "Codeforces",
  "Atcoder",
  "CSES",
  "Zerojudge",
  "Other"
];

export const getTopicStats = () => [
  {
    "topic": "LinkedList",
    "count": 3
  },
  {
    "topic": "Sliding Window",
    "count": 2
  },
  {
    "topic": "Hash Set",
    "count": 1
  },
  {
    "topic": "Two Pointers",
    "count": 1
  },
  {
    "topic": "Array",
    "count": 5
  },
  {
    "topic": "String",
    "count": 3
  },
  {
    "topic": "Math",
    "count": 3
  },
  {
    "topic": "BinarySearch",
    "count": 3
  },
  {
    "topic": "Dynamic Programming",
    "count": 2
  },
  {
    "topic": "Combinatorics",
    "count": 1
  },
  {
    "topic": "Grid Traversal",
    "count": 1
  },
  {
    "topic": "Backtracking",
    "count": 1
  },
  {
    "topic": "DynamicProgramming",
    "count": 2
  },
  {
    "topic": "HashTable",
    "count": 3
  },
  {
    "topic": "SlidingWindow",
    "count": 1
  },
  {
    "topic": "Tree",
    "count": 1
  },
  {
    "topic": "Sort",
    "count": 1
  },
  {
    "topic": "Hash Table",
    "count": 1
  },
  {
    "topic": "Greedy",
    "count": 2
  }
];

export const getDifficultyStats = () => ({
  "Easy": 0,
  "Medium": 28,
  "Hard": 0
});

export const getAllProblems = () => PROBLEMS;
export const getAllTopics = () => TOPICS;
export const getAllSources = () => SOURCES;
export const getProblemById = (id: string) => PROBLEMS.find(p => p.id === id);
export const getProblemByOriginalId = (originalId: number, source: string) => PROBLEMS.find(p => p.originalId === originalId && p.source.toLowerCase() === source.toLowerCase());
export const getProblemsByTopic = (topic: string) => 
  PROBLEMS.filter(p => p.topics.some(t => t.toLowerCase() === topic.toLowerCase()));
export const getProblemsBySource = (source: string) =>
  PROBLEMS.filter(p => p.source.toLowerCase() === source.toLowerCase());

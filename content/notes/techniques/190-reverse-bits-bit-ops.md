# Data Structure / Algorithm Concept Note：Bit 操作速查（搭配 LC190 Reverse Bits）

> 這份筆記重點是「看得懂 bit 語法」與「能寫出基本位元處理骨架」，不直接給可提交的完整解答。

---

## 0. Metadata
- **Concept Name**: Bit Operations（位元運算）
- **Category**: 基礎語法 / Bit Manipulation Pattern
- **Tags**: `bitmask`, `shift`, `AND`, `OR`, `XOR`, `uint32_t`, `LC190`
- **Prerequisites**: 二進位表示法、32-bit（含前導 0）
- **Familiarity (1–5)**: 1（先從 0 開始也 OK）
- **Last Updated**: 2025-12-12

---

## 1. Core Concept（What & Why）
### 直覺理解
把整數想成 **二進位 bit 串**。位元運算就是對每一個 bit 做規則性的操作（取某一位、設某一位、清某一位、左右搬移等）。

### 常見題型
- 取最低位 / 取第 k 位
- 設定位（set bit）/ 清除位（clear bit）
- 反轉 bit 串（reverse bits）— LC190
- 位元統計（popcount / count 1s）
- bitmask 表示集合、子集枚舉

### Complexity 目標
通常是 **O(位數)**：32 或 64 都可視為常數時間。

---

## 2. Invariants & Properties
### Core Invariants
- **Mask（遮罩）**：用 `1<<k` 只影響第 k 位
- **移位（shift）**：
  - `>>` 會把低位丟掉（向右移）
  - `<<` 會在低位補 0（向左移）

### Common Pitfalls
- **一定要處理滿 32 位**（LC190 需要包含前導 0）
- **signed vs unsigned 的右移**：
  - 有些語言/編譯器對「帶符號右移」可能做算術右移（補符號位）
  - LC190 建議用 `uint32_t` 更穩
- **運算子優先序**：位元運算常需要括號（尤其混用 `+ - *` 時）

---

## 3. Common Solution Patterns

### Pattern A：取最低位（LSB）+ 逐步右移
**When to use**：你想從右到左一位一位讀出 bit  
- **Steps**：
  1. `bit = n & 1` 取最低位
  2. `n >>= 1` 丟掉最低位，下一輪讀新的最低位

**Complexity**：每輪 O(1)，共 32/64 輪。

### Pattern B：答案左移騰位 + 塞 bit
**When to use**：你想「逐步建立」新的 bit 串  
- **Steps**：
  1. `ans <<= 1` 騰出一格
  2. `ans |= bit` 把 bit 塞進最低位

---

## 4. Pseudocode（Language-Agnostic Skeleton）
```text
ans = 0
repeat 32 times:
    bit = n AND 1
    ans = (ans SHIFT_LEFT 1) OR bit
    n = n SHIFT_RIGHT 1
return ans
```

---

## 5. Syntax Cheat‑Sheet（你最常看到的符號）

### 5.1 `&`（AND）
**規則**：兩個 bit 都是 1 才是 1  
**最常見用法**
- 取最低位：`n & 1`
- 檢查第 k 位是否為 1：`(n & (1u << k)) != 0`
- 清除最低位 1：`n & (n - 1)`（常用技巧）

**為什麼取最低位要用 `n & 1` 而不是 `n | 1`？**
- `n & 1`：看「最低位」本來是 0 或 1 → 結果就是 0 或 1
- `n | 1`：會把最低位 **強制變成 1** → 不是「取」，是「設」

例：
- `4 (100) & 1 = 0` ✅（最低位是 0）
- `4 (100) | 1 = 5 (101)` ❌（被改掉了）

---

### 5.2 `|`（OR）
**規則**：只要其中一個 bit 是 1 就是 1  
**用法**
- 設第 k 位為 1：`n |= (1u << k)`（set bit）
- 把某個 `bit` 塞進去：`ans |= bit`

---

### 5.3 `^`（XOR）
**規則**：兩個 bit 不同才是 1  
**用法**
- 翻轉第 k 位：`n ^= (1u << k)`
- 交換 / 差異偵測常見（也常出現在題目）

---

### 5.4 `~`（NOT）
**規則**：bit 取反（0↔1）  
**用法**
- 清除第 k 位：`n &= ~(1u << k)`
> 注意：`~` 會把所有位都反轉，所以幾乎都會搭配 mask。

---

### 5.5 `<<`（左移）
**直覺**：整個 bit 串往左搬，右邊補 0  
**常見**：`1u << k` 產生 mask（第 k 位是 1，其餘 0）

---

### 5.6 `>>`（右移）
**直覺**：整個 bit 串往右搬，右邊掉出來的位會消失  
**常見**
- 逐位讀：`n >>= 1`
- 取第 k 位：`(n >> k) & 1`

---

### 5.7 `>>=` / `<<=` / `|=` / `&=`（複合指定）
- `n >>= 1` 等同 `n = n >> 1`
- `ans <<= 1` 等同 `ans = ans << 1`
- `ans |= bit` 等同 `ans = ans | bit`

---

## 6. Minimal Working Example（手算一小段）
假設只看 8-bit（示意用），n = `00010110`  
我們想反轉成 `01101000`

- 初始：`ans=00000000`
- 取 bit：`n&1=0` → `ans<<=1` → `ans|=0` → `ans=00000000`，`n>>=1`→`00001011`
- 下一輪：`n&1=1` → `ans=00000001`，`n=00000101`
- …（重複固定流程）

**重點**：每輪都在做「讀最低位」＋「答案左移塞入」。

---

## 7. Edge Cases & Tests（LC190 特別重要）
- `n = 0` → 反轉仍是 0
- `n = 1` → 反轉後是 `1 << 31`
- `n` 二進位前面很多 0 → 仍要完整跑 32 次，不然會漏掉前導 0 的反轉
- 隨機測：
  - `n = 43261596` → `964176192`（題目範例）
  - `n = 2147483644` → `1073741822`（題目範例）

---

## 8. Relation to Neighboring Concepts
- `popcount`（數 1 的個數）與 `n & (n-1)` 常一起出現
- bitmask 表示集合（子集枚舉 `for mask in [0..2^n)`）
- 位元分治與查表（lookup table）是常見優化方式

---

## 9. Implementation Skeleton（留給你練習；非可提交完整碼）
### C++ Skeleton（LC190 方向）
```cpp
// Idea: repeat 32 times, take LSB, push into ans.
uint32_t reverseBits(uint32_t n) {
    uint32_t ans = 0;
    // repeat 32:
    //   bit = n & 1
    //   ans = (ans << 1) | bit
    //   n >>= 1
    return ans;
}
```

---

## 10. Common Problems（練習題清單）
- LeetCode:
  - [x] 190. Reverse Bits
  - [ ] 191. Number of 1 Bits
  - [ ] 268. Missing Number（XOR）
  - [ ] 136. Single Number（XOR）

---

## 11. Practice Plan（快速熟悉）
- Day 0：熟記 `& 1`、`(1<<k)`、`(n>>k)&1`
- Day 2：做 LC191 + 練 set/clear/toggle 第 k 位
- Day 7：做一題 bitmask 子集枚舉

---

## 12. Personal Notes（你的重點提醒）
- 「取最低位」是 **讀**：用 `& 1`  
  「把最低位變 1」是 **寫**：用 `| 1`
- 看到 `>>` / `<<`：
  - `>>` 常用來「拿某一位」或「逐位掃描」
  - `<<` 常用來「做 mask」或「把答案往左推騰位」

---

## 13. References
- LeetCode 190: Reverse Bits
- C++ `uint32_t`（避免 signed shift 問題）

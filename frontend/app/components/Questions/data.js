import React from 'react';

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'DIFFICULTY', uid: 'difficulty' },
  { name: 'CATEGORIES', uid: 'categories' },
];

const difficultyOptions = [
  { name: 'Easy', uid: 'Easy' },
  { name: 'Medium', uid: 'Medium' },
  { name: 'Hard', uid: 'Hard' },
];

const categoriesOptions = [
  { value: 'Array', label: 'Array' },
  { value: 'String', label: 'String' },
  { value: 'Hash Table', label: 'Hash Table' },
  { value: 'Linked List', label: 'Linked List' },
  { value: 'Math', label: 'Math' },
  { value: 'Two Pointers', label: 'Two Pointers' },
  { value: 'Binary Search', label: 'Binary Search' },
  { value: 'Dynamic Programming', label: 'Dynamic Programming' },
  { value: 'Greedy', label: 'Greedy' },
  { value: 'Backtracking', label: 'Backtracking' },
  { value: 'Stack', label: 'Stack' },
  { value: 'Queue', label: 'Queue' },
  { value: 'Heap', label: 'Heap' },
  { value: 'Graph', label: 'Graph' },
  { value: 'Tree', label: 'Tree' },
  { value: 'Depth-First Search', label: 'Depth-First Search' },
  { value: 'Breadth-First Search', label: 'Breadth-First Search' },
  { value: 'Union Find', label: 'Union Find' },
  { value: 'Trie', label: 'Trie' },
  { value: 'Design', label: 'Design' },
  { value: 'Bit Manipulation', label: 'Bit Manipulation' },
  { value: 'Recursion', label: 'Recursion' },
  { value: 'Memoization', label: 'Memoization' },
  { value: 'Geometry', label: 'Geometry' },
  { value: 'Random', label: 'Random' },
  { value: 'Simulation', label: 'Simulation' },
  { value: 'Brainteaser', label: 'Brainteaser' },
  { value: 'Minimax', label: 'Minimax' },
  { value: 'Sort', label: 'Sort' },
  { value: 'Counting Sort', label: 'Counting Sort' },
  { value: 'Radix Sort', label: 'Radix Sort' },
  { value: 'Binary Indexed Tree', label: 'Binary Indexed Tree' },
  { value: 'Segment Tree', label: 'Segment Tree' },
  { value: 'Binary Search Tree', label: 'Binary Search Tree' },
  { value: 'Priority Queue', label: 'Priority Queue' },
  { value: 'Divide and Conquer', label: 'Divide and Conquer' },
  { value: 'Randomized Algorithm', label: 'Randomized Algorithm' },
  { value: 'Hash Function', label: 'Hash Function' },
  { value: 'Sieve of Eratosthenes', label: 'Sieve of Eratosthenes' },
  { value: 'Topological Sort', label: 'Topological Sort' },
  { value: 'Quick Sort', label: 'Quick Sort' },
];

const questions = [
  {
    id: 0,
    title: 'Reconstruct Itinerary',
    difficulty: 'Hard',
    categories: ['Depth-First Search', 'Graph', 'Eulerian Circuit'],
    description:
      '<p>You are given a list of airline <code>tickets</code> where <code>tickets[i] = [from<sub>i</sub>, to<sub>i</sub>]</code> represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.</p>\n\n<p>All of the tickets belong to a man who departs from <code>"JFK"</code>, thus, the itinerary must begin with <code>"JFK"</code>. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.</p>\n\n<ul>\n\t<li>For example, the itinerary <code>["JFK", "LGA"]</code> has a smaller lexical order than <code>["JFK", "LGB"]</code>.</li>\n</ul>\n\n<p>You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/itinerary1-graph.jpg" style="width: 382px; height: 222px;">\n<pre><strong>Input:</strong> tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]\n<strong>Output:</strong> ["JFK","MUC","LHR","SFO","SJC"]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/itinerary2-graph.jpg" style="width: 222px; height: 230px;">\n<pre><strong>Input:</strong> tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]\n<strong>Output:</strong> ["JFK","ATL","JFK","SFO","ATL","SFO"]\n<strong>Explanation:</strong> Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= tickets.length &lt;= 300</code></li>\n\t<li><code>tickets[i].length == 2</code></li>\n\t<li><code>from<sub>i</sub>.length == 3</code></li>\n\t<li><code>to<sub>i</sub>.length == 3</code></li>\n\t<li><code>from<sub>i</sub></code> and <code>to<sub>i</sub></code> consist of uppercase English letters.</li>\n\t<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/reconstruct-itinerary/?envType=daily-question&envId=2023-09-14',
    solution_link:
      'https://leetcode.com/problems/reconstruct-itinerary/?envType=daily-question&envId=2023-09-14/solutions',
  },
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table'],
    description:
      '<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
    question_link: 'https://leetcode.com/problems/two-sum',
    solution_link: 'https://leetcode.com/problems/two-sum/solutions',
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    categories: ['Linked List', 'Math', 'Recursion'],
    description:
      '<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum&nbsp;as a linked list.</p>\n\n<p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg" style="width: 483px; height: 342px;">\n<pre><strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]\n<strong>Output:</strong> [7,0,8]\n<strong>Explanation:</strong> 342 + 465 = 807.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> l1 = [0], l2 = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\n<strong>Output:</strong> [8,9,9,9,0,0,0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in each linked list is in the range <code>[1, 100]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n\t<li>It is guaranteed that the list represents a number that does not have leading zeros.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/add-two-numbers',
    solution_link: 'https://leetcode.com/problems/add-two-numbers/solutions',
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    categories: ['Hash Table', 'String', 'Sliding Window'],
    description:
      '<p>Given a string <code>s</code>, find the length of the <strong>longest</strong> <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rb:"><div><strong>substring</strong></div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(354px, 221px);"></div></div></div></span> without repeating characters.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "abcabcbb"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is "abc", with the length of 3.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "bbbbb"\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The answer is "b", with the length of 1.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "pwwkew"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is "wke", with the length of 3.\nNotice that the answer must be a substring, "pwke" is a subsequence and not a substring.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of English letters, digits, symbols and spaces.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/longest-substring-without-repeating-characters',
    solution_link:
      'https://leetcode.com/problems/longest-substring-without-repeating-characters/solutions',
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    categories: ['Array', 'Binary Search', 'Divide and Conquer'],
    description:
      '<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>\n\n<p>The overall run time complexity should be <code>O(log (m+n))</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums1 = [1,3], nums2 = [2]\n<strong>Output:</strong> 2.00000\n<strong>Explanation:</strong> merged array = [1,2,3] and median is 2.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]\n<strong>Output:</strong> 2.50000\n<strong>Explanation:</strong> merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>nums1.length == m</code></li>\n\t<li><code>nums2.length == n</code></li>\n\t<li><code>0 &lt;= m &lt;= 1000</code></li>\n\t<li><code>0 &lt;= n &lt;= 1000</code></li>\n\t<li><code>1 &lt;= m + n &lt;= 2000</code></li>\n\t<li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/median-of-two-sorted-arrays',
    solution_link:
      'https://leetcode.com/problems/median-of-two-sorted-arrays/solutions',
  },
  {
    id: 5,
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    categories: ['String', 'Dynamic Programming'],
    description:
      '<p>Given a string <code>s</code>, return <em>the longest</em> <span data-keyword="palindromic-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r9:"><div><em>palindromic</em></div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(283px, 221px);"></div></div></div></span> <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rb:"><div><em>substring</em></div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(351px, 221px);"></div></div></div></span> in <code>s</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "babad"\n<strong>Output:</strong> "bab"\n<strong>Explanation:</strong> "aba" is also a valid answer.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "cbbd"\n<strong>Output:</strong> "bb"\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> consist of only digits and English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/longest-palindromic-substring',
    solution_link:
      'https://leetcode.com/problems/longest-palindromic-substring/solutions',
  },
  {
    id: 6,
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    categories: ['String'],
    description:
      '<p>The string <code>"PAYPALISHIRING"</code> is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)</p>\n\n<pre>P   A   H   N\nA P L S I I G\nY   I   R\n</pre>\n\n<p>And then read line by line: <code>"PAHNAPLSIIGYIR"</code></p>\n\n<p>Write the code that will take a string and make this conversion given a number of rows:</p>\n\n<pre>string convert(string s, int numRows);\n</pre>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "PAYPALISHIRING", numRows = 3\n<strong>Output:</strong> "PAHNAPLSIIGYIR"\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "PAYPALISHIRING", numRows = 4\n<strong>Output:</strong> "PINALSIGYAHRPI"\n<strong>Explanation:</strong>\nP     I    N\nA   L S  I G\nY A   H R\nP     I\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "A", numRows = 1\n<strong>Output:</strong> "A"\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> consists of English letters (lower-case and upper-case), <code>\',\'</code> and <code>\'.\'</code>.</li>\n\t<li><code>1 &lt;= numRows &lt;= 1000</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/zigzag-conversion',
    solution_link: 'https://leetcode.com/problems/zigzag-conversion/solutions',
  },
  {
    id: 7,
    title: 'Reverse Integer',
    difficulty: 'Medium',
    categories: ['Math'],
    description:
      '<p>Given a signed 32-bit integer <code>x</code>, return <code>x</code><em> with its digits reversed</em>. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then return <code>0</code>.</p>\n\n<p><strong>Assume the environment does not allow you to store 64-bit integers (signed or unsigned).</strong></p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> x = 123\n<strong>Output:</strong> 321\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> x = -123\n<strong>Output:</strong> -321\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> x = 120\n<strong>Output:</strong> 21\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/reverse-integer',
    solution_link: 'https://leetcode.com/problems/reverse-integer/solutions',
  },
  {
    id: 8,
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    categories: ['String'],
    description:
      '<p>Implement the <code>myAtoi(string s)</code> function, which converts a string to a 32-bit signed integer (similar to C/C++\'s <code>atoi</code> function).</p>\n\n<p>The algorithm for <code>myAtoi(string s)</code> is as follows:</p>\n\n<ol>\n\t<li>Read in and ignore any leading whitespace.</li>\n\t<li>Check if the next character (if not already at the end of the string) is <code>\'-\'</code> or <code>\'+\'</code>. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.</li>\n\t<li>Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.</li>\n\t<li>Convert these digits into an integer (i.e. <code>"123" -&gt; 123</code>, <code>"0032" -&gt; 32</code>). If no digits were read, then the integer is <code>0</code>. Change the sign as necessary (from step 2).</li>\n\t<li>If the integer is out of the 32-bit signed integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then clamp the integer so that it remains in the range. Specifically, integers less than <code>-2<sup>31</sup></code> should be clamped to <code>-2<sup>31</sup></code>, and integers greater than <code>2<sup>31</sup> - 1</code> should be clamped to <code>2<sup>31</sup> - 1</code>.</li>\n\t<li>Return the integer as the final result.</li>\n</ol>\n\n<p><strong>Note:</strong></p>\n\n<ul>\n\t<li>Only the space character <code>\' \'</code> is considered a whitespace character.</li>\n\t<li><strong>Do not ignore</strong> any characters other than the leading whitespace or the rest of the string after the digits.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "42"\n<strong>Output:</strong> 42\n<strong>Explanation:</strong> The underlined characters are what is read in, the caret is the current reader position.\nStep 1: "42" (no characters read because there is no leading whitespace)\n         ^\nStep 2: "42" (no characters read because there is neither a \'-\' nor \'+\')\n         ^\nStep 3: "<u>42</u>" ("42" is read in)\n           ^\nThe parsed integer is 42.\nSince 42 is in the range [-2<sup>31</sup>, 2<sup>31</sup> - 1], the final result is 42.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "   -42"\n<strong>Output:</strong> -42\n<strong>Explanation:</strong>\nStep 1: "<u>   </u>-42" (leading whitespace is read and ignored)\n            ^\nStep 2: "   <u>-</u>42" (\'-\' is read, so the result should be negative)\n             ^\nStep 3: "   -<u>42</u>" ("42" is read in)\n               ^\nThe parsed integer is -42.\nSince -42 is in the range [-2<sup>31</sup>, 2<sup>31</sup> - 1], the final result is -42.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "4193 with words"\n<strong>Output:</strong> 4193\n<strong>Explanation:</strong>\nStep 1: "4193 with words" (no characters read because there is no leading whitespace)\n         ^\nStep 2: "4193 with words" (no characters read because there is neither a \'-\' nor \'+\')\n         ^\nStep 3: "<u>4193</u> with words" ("4193" is read in; reading stops because the next character is a non-digit)\n             ^\nThe parsed integer is 4193.\nSince 4193 is in the range [-2<sup>31</sup>, 2<sup>31</sup> - 1], the final result is 4193.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 200</code></li>\n\t<li><code>s</code> consists of English letters (lower-case and upper-case), digits (<code>0-9</code>), <code>\' \'</code>, <code>\'+\'</code>, <code>\'-\'</code>, and <code>\'.\'</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/string-to-integer-atoi',
    solution_link:
      'https://leetcode.com/problems/string-to-integer-atoi/solutions',
  },
  {
    id: 9,
    title: 'Palindrome Number',
    difficulty: 'Easy',
    categories: ['Math'],
    description:
      '<p>Given an integer <code>x</code>, return <code>true</code><em> if </em><code>x</code><em> is a </em><span data-keyword="palindrome-integer" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rp:"><div><em><strong>palindrome</strong></em></div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(314px, 221px);"></div></div></div></span><em>, and </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> x = 121\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 121 reads as 121 from left to right and from right to left.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> x = -121\n<strong>Output:</strong> false\n<strong>Explanation:</strong> From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> x = 10\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Reads 01 from right to left. Therefore it is not a palindrome.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup>&nbsp;&lt;= x &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you solve it without converting the integer to a string?',
    question_link: 'https://leetcode.com/problems/palindrome-number',
    solution_link: 'https://leetcode.com/problems/palindrome-number/solutions',
  },
  {
    id: 10,
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    categories: ['String', 'Dynamic Programming', 'Recursion'],
    description:
      '<p>Given an input string <code>s</code>&nbsp;and a pattern <code>p</code>, implement regular expression matching with support for <code>\'.\'</code> and <code>\'*\'</code> where:</p>\n\n<ul>\n\t<li><code>\'.\'</code> Matches any single character.\u200b\u200b\u200b\u200b</li>\n\t<li><code>\'*\'</code> Matches zero or more of the preceding element.</li>\n</ul>\n\n<p>The matching should cover the <strong>entire</strong> input string (not partial).</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "aa", p = "a"\n<strong>Output:</strong> false\n<strong>Explanation:</strong> "a" does not match the entire string "aa".\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "aa", p = "a*"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> \'*\' means zero or more of the preceding element, \'a\'. Therefore, by repeating \'a\' once, it becomes "aa".\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "ab", p = ".*"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> ".*" means "zero or more (*) of any character (.)".\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length&nbsp;&lt;= 20</code></li>\n\t<li><code>1 &lt;= p.length&nbsp;&lt;= 20</code></li>\n\t<li><code>s</code> contains only lowercase English letters.</li>\n\t<li><code>p</code> contains only lowercase English letters, <code>\'.\'</code>, and&nbsp;<code>\'*\'</code>.</li>\n\t<li>It is guaranteed for each appearance of the character <code>\'*\'</code>, there will be a previous valid character to match.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/regular-expression-matching',
    solution_link:
      'https://leetcode.com/problems/regular-expression-matching/solutions',
  },
  {
    id: 11,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'Greedy'],
    description:
      '<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>\n\n<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>\n\n<p>Return <em>the maximum amount of water a container can store</em>.</p>\n\n<p><strong>Notice</strong> that you may not slant the container.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg" style="width: 600px; height: 287px;">\n<pre><strong>Input:</strong> height = [1,8,6,2,5,4,8,3,7]\n<strong>Output:</strong> 49\n<strong>Explanation:</strong> The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> height = [1,1]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/container-with-most-water',
    solution_link:
      'https://leetcode.com/problems/container-with-most-water/solutions',
  },
  {
    id: 12,
    title: 'Integer to Roman',
    difficulty: 'Medium',
    categories: ['Hash Table', 'Math', 'String'],
    description:
      '<p>Roman numerals are represented by seven different symbols:&nbsp;<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>\n\n<pre><strong>Symbol</strong>       <strong>Value</strong>\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000</pre>\n\n<p>For example,&nbsp;<code>2</code> is written as <code>II</code>&nbsp;in Roman numeral, just two one\'s added together. <code>12</code> is written as&nbsp;<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>\n\n<p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>\n\n<ul>\n\t<li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.&nbsp;</li>\n\t<li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.&nbsp;</li>\n\t<li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>\n</ul>\n\n<p>Given an integer, convert it to a roman numeral.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> num = 3\n<strong>Output:</strong> "III"\n<strong>Explanation:</strong> 3 is represented as 3 ones.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> num = 58\n<strong>Output:</strong> "LVIII"\n<strong>Explanation:</strong> L = 50, V = 5, III = 3.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> num = 1994\n<strong>Output:</strong> "MCMXCIV"\n<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num &lt;= 3999</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/integer-to-roman',
    solution_link: 'https://leetcode.com/problems/integer-to-roman/solutions',
  },
  {
    id: 13,
    title: 'Roman to Integer',
    difficulty: 'Easy',
    categories: ['Hash Table', 'Math', 'String'],
    description:
      "<p>Roman numerals are represented by seven different symbols:&nbsp;<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>\n\n<pre><strong>Symbol</strong>       <strong>Value</strong>\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000</pre>\n\n<p>For example,&nbsp;<code>2</code> is written as <code>II</code>&nbsp;in Roman numeral, just two ones added together. <code>12</code> is written as&nbsp;<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>\n\n<p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>\n\n<ul>\n\t<li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.&nbsp;</li>\n\t<li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.&nbsp;</li>\n\t<li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>\n</ul>\n\n<p>Given a roman numeral, convert it to an integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = \"III\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> III = 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = \"LVIII\"\n<strong>Output:</strong> 58\n<strong>Explanation:</strong> L = 50, V= 5, III = 3.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = \"MCMXCIV\"\n<strong>Output:</strong> 1994\n<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 15</code></li>\n\t<li><code>s</code> contains only&nbsp;the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.</li>\n\t<li>It is <strong>guaranteed</strong>&nbsp;that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li>\n</ul>\n",
    question_link: 'https://leetcode.com/problems/roman-to-integer',
    solution_link: 'https://leetcode.com/problems/roman-to-integer/solutions',
  },
  {
    id: 14,
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    categories: ['String', 'Trie'],
    description:
      '<p>Write a function to find the longest common prefix string amongst an array of strings.</p>\n\n<p>If there is no common prefix, return an empty string <code>""</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> strs = ["flower","flow","flight"]\n<strong>Output:</strong> "fl"\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> strs = ["dog","racecar","car"]\n<strong>Output:</strong> ""\n<strong>Explanation:</strong> There is no common prefix among the input strings.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 200</code></li>\n\t<li><code>0 &lt;= strs[i].length &lt;= 200</code></li>\n\t<li><code>strs[i]</code> consists of only lowercase English letters.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/longest-common-prefix',
    solution_link:
      'https://leetcode.com/problems/longest-common-prefix/solutions',
  },
  {
    id: 15,
    title: '3Sum',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'Sorting'],
    description:
      '<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>\n\n<p>Notice that the solution set must not contain duplicate triplets.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [-1,0,1,2,-1,-4]\n<strong>Output:</strong> [[-1,-1,2],[-1,0,1]]\n<strong>Explanation:</strong> \nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\nNotice that the order of the output and the order of the triplets does not matter.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,1,1]\n<strong>Output:</strong> []\n<strong>Explanation:</strong> The only possible triplet does not sum up to 0.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,0,0]\n<strong>Output:</strong> [[0,0,0]]\n<strong>Explanation:</strong> The only possible triplet sums up to 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 3000</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/3sum',
    solution_link: 'https://leetcode.com/problems/3sum/solutions',
  },
  {
    id: 16,
    title: '3Sum Closest',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'Sorting'],
    description:
      '<p>Given an integer array <code>nums</code> of length <code>n</code> and an integer <code>target</code>, find three integers in <code>nums</code> such that the sum is closest to <code>target</code>.</p>\n\n<p>Return <em>the sum of the three integers</em>.</p>\n\n<p>You may assume that each input would have exactly one solution.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [-1,2,1,-4], target = 1\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,0,0], target = 1\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The sum that is closest to the target is 0. (0 + 0 + 0 = 0).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 500</code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/3sum-closest',
    solution_link: 'https://leetcode.com/problems/3sum-closest/solutions',
  },
  {
    id: 17,
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    categories: ['Hash Table', 'String', 'Backtracking'],
    description:
      '<p>Given a string containing digits from <code>2-9</code> inclusive, return all possible letter combinations that the number could represent. Return the answer in <strong>any order</strong>.</p>\n\n<p>A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.</p>\n<img alt="" src="https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png" style="width: 300px; height: 243px;">\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> digits = "23"\n<strong>Output:</strong> ["ad","ae","af","bd","be","bf","cd","ce","cf"]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> digits = ""\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> digits = "2"\n<strong>Output:</strong> ["a","b","c"]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= digits.length &lt;= 4</code></li>\n\t<li><code>digits[i]</code> is a digit in the range <code>[\'2\', \'9\']</code>.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/letter-combinations-of-a-phone-number',
    solution_link:
      'https://leetcode.com/problems/letter-combinations-of-a-phone-number/solutions',
  },
  {
    id: 18,
    title: '4Sum',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'Sorting'],
    description:
      '<p>Given an array <code>nums</code> of <code>n</code> integers, return <em>an array of all the <strong>unique</strong> quadruplets</em> <code>[nums[a], nums[b], nums[c], nums[d]]</code> such that:</p>\n\n<ul>\n\t<li><code>0 &lt;= a, b, c, d&nbsp;&lt; n</code></li>\n\t<li><code>a</code>, <code>b</code>, <code>c</code>, and <code>d</code> are <strong>distinct</strong>.</li>\n\t<li><code>nums[a] + nums[b] + nums[c] + nums[d] == target</code></li>\n</ul>\n\n<p>You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,0,-1,0,-2,2], target = 0\n<strong>Output:</strong> [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [2,2,2,2,2], target = 8\n<strong>Output:</strong> [[2,2,2,2]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 200</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/4sum',
    solution_link: 'https://leetcode.com/problems/4sum/solutions',
  },
  {
    id: 19,
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    categories: ['Linked List', 'Two Pointers'],
    description:
      '<p>Given the <code>head</code> of a linked list, remove the <code>n<sup>th</sup></code> node from the end of the list and return its head.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg" style="width: 542px; height: 222px;">\n<pre><strong>Input:</strong> head = [1,2,3,4,5], n = 2\n<strong>Output:</strong> [1,2,3,5]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> head = [1], n = 1\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> head = [1,2], n = 1\n<strong>Output:</strong> [1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>sz</code>.</li>\n\t<li><code>1 &lt;= sz &lt;= 30</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>1 &lt;= n &lt;= sz</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you do this in one pass?</p>\n',
    question_link:
      'https://leetcode.com/problems/remove-nth-node-from-end-of-list',
    solution_link:
      'https://leetcode.com/problems/remove-nth-node-from-end-of-list/solutions',
  },
  {
    id: 20,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    categories: ['String', 'Stack'],
    description:
      "<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>\n\n<p>An input string is valid if:</p>\n\n<ol>\n\t<li>Open brackets must be closed by the same type of brackets.</li>\n\t<li>Open brackets must be closed in the correct order.</li>\n\t<li>Every close bracket has a corresponding open bracket of the same type.</li>\n</ol>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = \"()\"\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = \"()[]{}\"\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = \"(]\"\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of parentheses only <code>'()[]{}'</code>.</li>\n</ul>\n",
    question_link: 'https://leetcode.com/problems/valid-parentheses',
    solution_link: 'https://leetcode.com/problems/valid-parentheses/solutions',
  },
  {
    id: 21,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    categories: ['Linked List', 'Recursion'],
    description:
      '<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>\n\n<p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>\n\n<p>Return <em>the head of the merged linked list</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg" style="width: 662px; height: 302px;">\n<pre><strong>Input:</strong> list1 = [1,2,4], list2 = [1,3,4]\n<strong>Output:</strong> [1,1,2,3,4,4]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> list1 = [], list2 = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> list1 = [], list2 = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in both lists is in the range <code>[0, 50]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n\t<li>Both <code>list1</code> and <code>list2</code> are sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/merge-two-sorted-lists',
    solution_link:
      'https://leetcode.com/problems/merge-two-sorted-lists/solutions',
  },
  {
    id: 22,
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    categories: ['String', 'Dynamic Programming', 'Backtracking'],
    description:
      '<p>Given <code>n</code> pairs of parentheses, write a function to <em>generate all combinations of well-formed parentheses</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 3\n<strong>Output:</strong> ["((()))","(()())","(())()","()(())","()()()"]\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> ["()"]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 8</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/generate-parentheses',
    solution_link:
      'https://leetcode.com/problems/generate-parentheses/solutions',
  },
  {
    id: 23,
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    categories: ['Linked List', 'Divide and Conquer', '2+'],
    description:
      '<p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p>\n\n<p><em>Merge all the linked-lists into one sorted linked-list and return it.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> lists = [[1,4,5],[1,3,4],[2,6]]\n<strong>Output:</strong> [1,1,2,3,4,4,5,6]\n<strong>Explanation:</strong> The linked-lists are:\n[\n  1-&gt;4-&gt;5,\n  1-&gt;3-&gt;4,\n  2-&gt;6\n]\nmerging them into one sorted list:\n1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> lists = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> lists = [[]]\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>k == lists.length</code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= lists[i].length &lt;= 500</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= lists[i][j] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>lists[i]</code> is sorted in <strong>ascending order</strong>.</li>\n\t<li>The sum of <code>lists[i].length</code> will not exceed <code>10<sup>4</sup></code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/merge-k-sorted-lists',
    solution_link:
      'https://leetcode.com/problems/merge-k-sorted-lists/solutions',
  },
  {
    id: 24,
    title: 'Swap Nodes in Pairs',
    difficulty: 'Medium',
    categories: ['Linked List', 'Recursion'],
    description:
      '<p>Given a&nbsp;linked list, swap every two adjacent nodes and return its head. You must solve the problem without&nbsp;modifying the values in the list\'s nodes (i.e., only nodes themselves may be changed.)</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg" style="width: 422px; height: 222px;">\n<pre><strong>Input:</strong> head = [1,2,3,4]\n<strong>Output:</strong> [2,1,4,3]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> head = []\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> head = [1]\n<strong>Output:</strong> [1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the&nbsp;list&nbsp;is in the range <code>[0, 100]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/swap-nodes-in-pairs',
    solution_link:
      'https://leetcode.com/problems/swap-nodes-in-pairs/solutions',
  },
  {
    id: 25,
    title: 'Reverse Nodes in k-Group',
    difficulty: 'Hard',
    categories: ['Linked List', 'Recursion'],
    description:
      '<p>Given the <code>head</code> of a linked list, reverse the nodes of the list <code>k</code> at a time, and return <em>the modified list</em>.</p>\n\n<p><code>k</code> is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of <code>k</code> then left-out nodes, in the end, should remain as it is.</p>\n\n<p>You may not alter the values in the list\'s nodes, only nodes themselves may be changed.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg" style="width: 542px; height: 222px;">\n<pre><strong>Input:</strong> head = [1,2,3,4,5], k = 2\n<strong>Output:</strong> [2,1,4,3,5]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg" style="width: 542px; height: 222px;">\n<pre><strong>Input:</strong> head = [1,2,3,4,5], k = 3\n<strong>Output:</strong> [3,2,1,4,5]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the list is <code>n</code>.</li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow-up:</strong> Can you solve the problem in <code>O(1)</code> extra memory space?</p>\n',
    question_link: 'https://leetcode.com/problems/reverse-nodes-in-k-group',
    solution_link:
      'https://leetcode.com/problems/reverse-nodes-in-k-group/solutions',
  },
  {
    id: 26,
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    categories: ['Array', 'Two Pointers'],
    description:
      '<p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong>, remove the duplicates <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a> such that each unique element appears only <strong>once</strong>. The <strong>relative order</strong> of the elements should be kept the <strong>same</strong>. Then return <em>the number of unique elements in </em><code>nums</code>.</p>\n\n<p>Consider the number of unique elements of <code>nums</code> to be <code>k</code>, to get accepted, you need to do the following things:</p>\n\n<ul>\n\t<li>Change the array <code>nums</code> such that the first <code>k</code> elements of <code>nums</code> contain the unique elements in the order they were present in <code>nums</code> initially. The remaining elements of <code>nums</code> are not important as well as the size of <code>nums</code>.</li>\n\t<li>Return <code>k</code>.</li>\n</ul>\n\n<p><strong>Custom Judge:</strong></p>\n\n<p>The judge will test your solution with the following code:</p>\n\n<pre>int[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i &lt; k; i++) {\n    assert nums[i] == expectedNums[i];\n}\n</pre>\n\n<p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong> 2, nums = [1,2,_]\n<strong>Explanation:</strong> Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,0,1,1,1,2,2,3,3,4]\n<strong>Output:</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]\n<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n\t<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/remove-duplicates-from-sorted-array',
    solution_link:
      'https://leetcode.com/problems/remove-duplicates-from-sorted-array/solutions',
  },
  {
    id: 27,
    title: 'Remove Element',
    difficulty: 'Easy',
    categories: ['Array', 'Two Pointers'],
    description:
      '<p>Given an integer array <code>nums</code> and an integer <code>val</code>, remove all occurrences of <code>val</code> in <code>nums</code> <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a>. The order of the elements may be changed. Then return <em>the number of elements in </em><code>nums</code><em> which are not equal to </em><code>val</code>.</p>\n\n<p>Consider the number of elements in <code>nums</code> which are not equal to <code>val</code> be <code>k</code>, to get accepted, you need to do the following things:</p>\n\n<ul>\n\t<li>Change the array <code>nums</code> such that the first <code>k</code> elements of <code>nums</code> contain the elements which are not equal to <code>val</code>. The remaining elements of <code>nums</code> are not important as well as the size of <code>nums</code>.</li>\n\t<li>Return <code>k</code>.</li>\n</ul>\n\n<p><strong>Custom Judge:</strong></p>\n\n<p>The judge will test your solution with the following code:</p>\n\n<pre>int[] nums = [...]; // Input array\nint val = ...; // Value to remove\nint[] expectedNums = [...]; // The expected answer with correct length.\n                            // It is sorted with no values equaling val.\n\nint k = removeElement(nums, val); // Calls your implementation\n\nassert k == expectedNums.length;\nsort(nums, 0, k); // Sort the first k elements of nums\nfor (int i = 0; i &lt; actualLength; i++) {\n    assert nums[i] == expectedNums[i];\n}\n</pre>\n\n<p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [3,2,2,3], val = 3\n<strong>Output:</strong> 2, nums = [2,2,_,_]\n<strong>Explanation:</strong> Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,1,2,2,3,0,4,2], val = 2\n<strong>Output:</strong> 5, nums = [0,1,4,0,3,_,_,_]\n<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.\nNote that the five elements can be returned in any order.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 50</code></li>\n\t<li><code>0 &lt;= val &lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/remove-element',
    solution_link: 'https://leetcode.com/problems/remove-element/solutions',
  },
  {
    id: 28,
    title: 'Find the Index of the First Occurrence in a String',
    difficulty: 'Easy',
    categories: ['Two Pointers', 'String', 'String Matching'],
    description:
      '<p>Given two strings <code>needle</code> and <code>haystack</code>, return the index of the first occurrence of <code>needle</code> in <code>haystack</code>, or <code>-1</code> if <code>needle</code> is not part of <code>haystack</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> haystack = "sadbutsad", needle = "sad"\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> "sad" occurs at index 0 and 6.\nThe first occurrence is at index 0, so we return 0.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> haystack = "leetcode", needle = "leeto"\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> "leeto" did not occur in "leetcode", so we return -1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= haystack.length, needle.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>haystack</code> and <code>needle</code> consist of only lowercase English characters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string',
    solution_link:
      'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/solutions',
  },
  {
    id: 29,
    title: 'Divide Two Integers',
    difficulty: 'Medium',
    categories: ['Math', 'Bit Manipulation'],
    description:
      '<p>Given two integers <code>dividend</code> and <code>divisor</code>, divide two integers <strong>without</strong> using multiplication, division, and mod operator.</p>\n\n<p>The integer division should truncate toward zero, which means losing its fractional part. For example, <code>8.345</code> would be truncated to <code>8</code>, and <code>-2.7335</code> would be truncated to <code>-2</code>.</p>\n\n<p>Return <em>the <strong>quotient</strong> after dividing </em><code>dividend</code><em> by </em><code>divisor</code>.</p>\n\n<p><strong>Note: </strong>Assume we are dealing with an environment that could only store integers within the <strong>32-bit</strong> signed integer range: <code>[\u22122<sup>31</sup>, 2<sup>31</sup> \u2212 1]</code>. For this problem, if the quotient is <strong>strictly greater than</strong> <code>2<sup>31</sup> - 1</code>, then return <code>2<sup>31</sup> - 1</code>, and if the quotient is <strong>strictly less than</strong> <code>-2<sup>31</sup></code>, then return <code>-2<sup>31</sup></code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> dividend = 10, divisor = 3\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 10/3 = 3.33333.. which is truncated to 3.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> dividend = 7, divisor = -3\n<strong>Output:</strong> -2\n<strong>Explanation:</strong> 7/-3 = -2.33333.. which is truncated to -2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup> &lt;= dividend, divisor &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>divisor != 0</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/divide-two-integers',
    solution_link:
      'https://leetcode.com/problems/divide-two-integers/solutions',
  },
  {
    id: 30,
    title: 'Substring with Concatenation of All Words',
    difficulty: 'Hard',
    categories: ['Hash Table', 'String', 'Sliding Window'],
    description:
      '<p>You are given a string <code>s</code> and an array of strings <code>words</code>. All the strings of <code>words</code> are of <strong>the same length</strong>.</p>\n\n<p>A <strong>concatenated substring</strong> in <code>s</code> is a substring that contains all the strings of any permutation of <code>words</code> concatenated.</p>\n\n<ul>\n\t<li>For example, if <code>words = ["ab","cd","ef"]</code>, then <code>"abcdef"</code>, <code>"abefcd"</code>, <code>"cdabef"</code>, <code>"cdefab"</code>, <code>"efabcd"</code>, and <code>"efcdab"</code> are all concatenated strings. <code>"acdbef"</code> is not a concatenated substring because it is not the concatenation of any permutation of <code>words</code>.</li>\n</ul>\n\n<p>Return <em>the starting indices of all the concatenated substrings in </em><code>s</code>. You can return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "barfoothefoobarman", words = ["foo","bar"]\n<strong>Output:</strong> [0,9]\n<strong>Explanation:</strong> Since words.length == 2 and words[i].length == 3, the concatenated substring has to be of length 6.\nThe substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.\nThe substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.\nThe output order does not matter. Returning [9,0] is fine too.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]\n<strong>Output:</strong> []\n<strong>Explanation:</strong> Since words.length == 4 and words[i].length == 4, the concatenated substring has to be of length 16.\nThere is no substring of length 16 in s that is equal to the concatenation of any permutation of words.\nWe return an empty array.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]\n<strong>Output:</strong> [6,9,12]\n<strong>Explanation:</strong> Since words.length == 3 and words[i].length == 3, the concatenated substring has to be of length 9.\nThe substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"] which is a permutation of words.\nThe substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"] which is a permutation of words.\nThe substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"] which is a permutation of words.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= words.length &lt;= 5000</code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 30</code></li>\n\t<li><code>s</code> and <code>words[i]</code> consist of lowercase English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/substring-with-concatenation-of-all-words',
    solution_link:
      'https://leetcode.com/problems/substring-with-concatenation-of-all-words/solutions',
  },
  {
    id: 31,
    title: 'Next Permutation',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers'],
    description:
      '<p>A <strong>permutation</strong> of an array of integers is an arrangement of its members into a sequence or linear order.</p>\n\n<ul>\n\t<li>For example, for <code>arr = [1,2,3]</code>, the following are all the permutations of <code>arr</code>: <code>[1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1]</code>.</li>\n</ul>\n\n<p>The <strong>next permutation</strong> of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the <strong>next permutation</strong> of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).</p>\n\n<ul>\n\t<li>For example, the next permutation of <code>arr = [1,2,3]</code> is <code>[1,3,2]</code>.</li>\n\t<li>Similarly, the next permutation of <code>arr = [2,3,1]</code> is <code>[3,1,2]</code>.</li>\n\t<li>While the next permutation of <code>arr = [3,2,1]</code> is <code>[1,2,3]</code> because <code>[3,2,1]</code> does not have a lexicographical larger rearrangement.</li>\n</ul>\n\n<p>Given an array of integers <code>nums</code>, <em>find the next permutation of</em> <code>nums</code>.</p>\n\n<p>The replacement must be <strong><a href="http://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">in place</a></strong> and use only constant extra memory.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [1,3,2]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [3,2,1]\n<strong>Output:</strong> [1,2,3]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,1,5]\n<strong>Output:</strong> [1,5,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/next-permutation',
    solution_link: 'https://leetcode.com/problems/next-permutation/solutions',
  },
  {
    id: 32,
    title: 'Longest Valid Parentheses',
    difficulty: 'Hard',
    categories: ['String', 'Dynamic Programming', 'Stack'],
    description:
      '<p>Given a string containing just the characters <code>\'(\'</code> and <code>\')\'</code>, return <em>the length of the longest valid (well-formed) parentheses </em><span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rr:"><div><em>substring</em></div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(809px, 221px);"></div></div></div></span>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "(()"\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The longest valid parentheses substring is "()".\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = ")()())"\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest valid parentheses substring is "()()".\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = ""\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s[i]</code> is <code>\'(\'</code>, or <code>\')\'</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/longest-valid-parentheses',
    solution_link:
      'https://leetcode.com/problems/longest-valid-parentheses/solutions',
  },
  {
    id: 33,
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    categories: ['Array', 'Binary Search'],
    description:
      '<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).</p>\n\n<p>Prior to being passed to your function, <code>nums</code> is <strong>possibly rotated</strong> at an unknown pivot index <code>k</code> (<code>1 &lt;= k &lt; nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (<strong>0-indexed</strong>). For example, <code>[0,1,2,4,5,6,7]</code> might be rotated at pivot index <code>3</code> and become <code>[4,5,6,7,0,1,2]</code>.</p>\n\n<p>Given the array <code>nums</code> <strong>after</strong> the possible rotation and an integer <code>target</code>, return <em>the index of </em><code>target</code><em> if it is in </em><code>nums</code><em>, or </em><code>-1</code><em> if it is not in </em><code>nums</code>.</p>\n\n<p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 0\n<strong>Output:</strong> 4\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 3\n<strong>Output:</strong> -1\n</pre><p><strong class="example">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [1], target = 0\n<strong>Output:</strong> -1\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li>All values of <code>nums</code> are <strong>unique</strong>.</li>\n\t<li><code>nums</code> is an ascending array that is possibly rotated.</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/search-in-rotated-sorted-array',
    solution_link:
      'https://leetcode.com/problems/search-in-rotated-sorted-array/solutions',
  },
  {
    id: 34,
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    categories: ['Array', 'Binary Search'],
    description:
      '<p>Given an array of integers <code>nums</code> sorted in non-decreasing order, find the starting and ending position of a given <code>target</code> value.</p>\n\n<p>If <code>target</code> is not found in the array, return <code>[-1, -1]</code>.</p>\n\n<p>You must&nbsp;write an algorithm with&nbsp;<code>O(log n)</code> runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [5,7,7,8,8,10], target = 8\n<strong>Output:</strong> [3,4]\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [5,7,7,8,8,10], target = 6\n<strong>Output:</strong> [-1,-1]\n</pre><p><strong class="example">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [], target = 0\n<strong>Output:</strong> [-1,-1]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= nums[i]&nbsp;&lt;= 10<sup>9</sup></code></li>\n\t<li><code>nums</code> is a non-decreasing array.</li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= target&nbsp;&lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array',
    solution_link:
      'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/solutions',
  },
  {
    id: 35,
    title: 'Search Insert Position',
    difficulty: 'Easy',
    categories: ['Array', 'Binary Search'],
    description:
      '<p>Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.</p>\n\n<p>You must&nbsp;write an algorithm with&nbsp;<code>O(log n)</code> runtime complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,3,5,6], target = 5\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,3,5,6], target = 2\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,3,5,6], target = 7\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> contains <strong>distinct</strong> values sorted in <strong>ascending</strong> order.</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/search-insert-position',
    solution_link:
      'https://leetcode.com/problems/search-insert-position/solutions',
  },
  {
    id: 36,
    title: 'Valid Sudoku',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Matrix'],
    description:
      '<p>Determine if a&nbsp;<code>9 x 9</code> Sudoku board&nbsp;is valid.&nbsp;Only the filled cells need to be validated&nbsp;<strong>according to the following rules</strong>:</p>\n\n<ol>\n\t<li>Each row&nbsp;must contain the&nbsp;digits&nbsp;<code>1-9</code> without repetition.</li>\n\t<li>Each column must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>\n\t<li>Each of the nine&nbsp;<code>3 x 3</code> sub-boxes of the grid must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>\n</ol>\n\n<p><strong>Note:</strong></p>\n\n<ul>\n\t<li>A Sudoku board (partially filled) could be valid but is not necessarily solvable.</li>\n\t<li>Only the filled cells need to be validated according to the mentioned&nbsp;rules.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png" style="height: 250px; width: 250px;">\n<pre><strong>Input:</strong> board = \n[["5","3",".",".","7",".",".",".","."]\n,["6",".",".","1","9","5",".",".","."]\n,[".","9","8",".",".",".",".","6","."]\n,["8",".",".",".","6",".",".",".","3"]\n,["4",".",".","8",".","3",".",".","1"]\n,["7",".",".",".","2",".",".",".","6"]\n,[".","6",".",".",".",".","2","8","."]\n,[".",".",".","4","1","9",".",".","5"]\n,[".",".",".",".","8",".",".","7","9"]]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> board = \n[["8","3",".",".","7",".",".",".","."]\n,["6",".",".","1","9","5",".",".","."]\n,[".","9","8",".",".",".",".","6","."]\n,["8",".",".",".","6",".",".",".","3"]\n,["4",".",".","8",".","3",".",".","1"]\n,["7",".",".",".","2",".",".",".","6"]\n,[".","6",".",".",".",".","2","8","."]\n,[".",".",".","4","1","9",".",".","5"]\n,[".",".",".",".","8",".",".","7","9"]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Same as Example 1, except with the <strong>5</strong> in the top left corner being modified to <strong>8</strong>. Since there are two 8\'s in the top left 3x3 sub-box, it is invalid.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>board.length == 9</code></li>\n\t<li><code>board[i].length == 9</code></li>\n\t<li><code>board[i][j]</code> is a digit <code>1-9</code> or <code>\'.\'</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/valid-sudoku',
    solution_link: 'https://leetcode.com/problems/valid-sudoku/solutions',
  },
  {
    id: 37,
    title: 'Sudoku Solver',
    difficulty: 'Hard',
    categories: ['Array', 'Hash Table', 'Backtracking', '1+'],
    description:
      '<p>Write a program to solve a Sudoku puzzle by filling the empty cells.</p>\n\n<p>A sudoku solution must satisfy <strong>all of the following rules</strong>:</p>\n\n<ol>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each row.</li>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each column.</li>\n\t<li>Each of the digits <code>1-9</code> must occur exactly once in each of the 9 <code>3x3</code> sub-boxes of the grid.</li>\n</ol>\n\n<p>The <code>\'.\'</code> character indicates empty cells.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png" style="height: 250px; width: 250px;">\n<pre><strong>Input:</strong> board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]\n<strong>Output:</strong> [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]\n<strong>Explanation:</strong>&nbsp;The input board is shown above and the only valid solution is shown below:\n\n<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png" style="height: 250px; width: 250px;">\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>board.length == 9</code></li>\n\t<li><code>board[i].length == 9</code></li>\n\t<li><code>board[i][j]</code> is a digit or <code>\'.\'</code>.</li>\n\t<li>It is <strong>guaranteed</strong> that the input board has only one solution.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/sudoku-solver',
    solution_link: 'https://leetcode.com/problems/sudoku-solver/solutions',
  },
  {
    id: 38,
    title: 'Count and Say',
    difficulty: 'Medium',
    categories: ['String'],
    description:
      '<p>The <strong>count-and-say</strong> sequence is a sequence of digit strings defined by the recursive formula:</p>\n\n<ul>\n\t<li><code>countAndSay(1) = "1"</code></li>\n\t<li><code>countAndSay(n)</code> is the way you would "say" the digit string from <code>countAndSay(n-1)</code>, which is then converted into a different digit string.</li>\n</ul>\n\n<p>To determine how you "say" a digit string, split it into the <strong>minimal</strong> number of substrings such that each substring contains exactly <strong>one</strong> unique digit. Then for each substring, say the number of digits, then say the digit. Finally, concatenate every said digit.</p>\n\n<p>For example, the saying and conversion for digit string <code>"3322251"</code>:</p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/23/countandsay.jpg" style="width: 581px; height: 172px;">\n<p>Given a positive integer <code>n</code>, return <em>the </em><code>n<sup>th</sup></code><em> term of the <strong>count-and-say</strong> sequence</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> "1"\n<strong>Explanation:</strong> This is the base case.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = 4\n<strong>Output:</strong> "1211"\n<strong>Explanation:</strong>\ncountAndSay(1) = "1"\ncountAndSay(2) = say "1" = one 1 = "11"\ncountAndSay(3) = say "11" = two 1\'s = "21"\ncountAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 30</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/count-and-say',
    solution_link: 'https://leetcode.com/problems/count-and-say/solutions',
  },
  {
    id: 39,
    title: 'Combination Sum',
    difficulty: 'Medium',
    categories: ['Array', 'Backtracking'],
    description:
      '<p>Given an array of <strong>distinct</strong> integers <code>candidates</code> and a target integer <code>target</code>, return <em>a list of all <strong>unique combinations</strong> of </em><code>candidates</code><em> where the chosen numbers sum to </em><code>target</code><em>.</em> You may return the combinations in <strong>any order</strong>.</p>\n\n<p>The <strong>same</strong> number may be chosen from <code>candidates</code> an <strong>unlimited number of times</strong>. Two combinations are unique if the <span data-keyword="frequency-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rp:"><div>frequency</div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(811px, 279px);"></div></div></div></span> of at least one of the chosen numbers is different.</p>\n\n<p>The test cases are generated such that the number of unique combinations that sum up to <code>target</code> is less than <code>150</code> combinations for the given input.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> candidates = [2,3,6,7], target = 7\n<strong>Output:</strong> [[2,2,3],[7]]\n<strong>Explanation:</strong>\n2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> candidates = [2,3,5], target = 8\n<strong>Output:</strong> [[2,2,2,2],[2,3,3],[3,5]]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> candidates = [2], target = 1\n<strong>Output:</strong> []\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= candidates.length &lt;= 30</code></li>\n\t<li><code>2 &lt;= candidates[i] &lt;= 40</code></li>\n\t<li>All elements of <code>candidates</code> are <strong>distinct</strong>.</li>\n\t<li><code>1 &lt;= target &lt;= 40</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/combination-sum',
    solution_link: 'https://leetcode.com/problems/combination-sum/solutions',
  },
  {
    id: 40,
    title: 'Combination Sum II',
    difficulty: 'Medium',
    categories: ['Array', 'Backtracking'],
    description:
      '<p>Given a collection of candidate numbers (<code>candidates</code>) and a target number (<code>target</code>), find all unique combinations in <code>candidates</code>&nbsp;where the candidate numbers sum to <code>target</code>.</p>\n\n<p>Each number in <code>candidates</code>&nbsp;may only be used <strong>once</strong> in the combination.</p>\n\n<p><strong>Note:</strong>&nbsp;The solution set must not contain duplicate combinations.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> candidates = [10,1,2,7,6,1,5], target = 8\n<strong>Output:</strong> \n[\n[1,1,6],\n[1,2,5],\n[1,7],\n[2,6]\n]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> candidates = [2,5,2,1,2], target = 5\n<strong>Output:</strong> \n[\n[1,2,2],\n[5]\n]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;=&nbsp;candidates.length &lt;= 100</code></li>\n\t<li><code>1 &lt;=&nbsp;candidates[i] &lt;= 50</code></li>\n\t<li><code>1 &lt;= target &lt;= 30</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/combination-sum-ii',
    solution_link: 'https://leetcode.com/problems/combination-sum-ii/solutions',
  },
  {
    id: 41,
    title: 'First Missing Positive',
    difficulty: 'Hard',
    categories: ['Array', 'Hash Table'],
    description:
      '<p>Given an unsorted integer array <code>nums</code>, return the smallest missing positive integer.</p>\n\n<p>You must implement an algorithm that runs in <code>O(n)</code> time and uses <code>O(1)</code> auxiliary space.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,0]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The numbers in the range [1,2] are all in the array.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [3,4,-1,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> 1 is in the array but 2 is missing.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [7,8,9,11,12]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The smallest positive integer 1 is missing.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/first-missing-positive',
    solution_link:
      'https://leetcode.com/problems/first-missing-positive/solutions',
  },
  {
    id: 42,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    categories: ['Array', 'Two Pointers', '3+'],
    description:
      '<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img src="https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png" style="width: 412px; height: 161px;">\n<pre><strong>Input:</strong> height = [0,1,0,2,1,0,1,3,2,1,2,1]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> height = [4,2,0,3,2,5]\n<strong>Output:</strong> 9\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/trapping-rain-water',
    solution_link:
      'https://leetcode.com/problems/trapping-rain-water/solutions',
  },
  {
    id: 43,
    title: 'Multiply Strings',
    difficulty: 'Medium',
    categories: ['Math', 'String', 'Simulation'],
    description:
      '<p>Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product of <code>num1</code> and <code>num2</code>, also represented as a string.</p>\n\n<p><strong>Note:</strong>&nbsp;You must not use any built-in BigInteger library or convert the inputs to integer directly.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> num1 = "2", num2 = "3"\n<strong>Output:</strong> "6"\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> num1 = "123", num2 = "456"\n<strong>Output:</strong> "56088"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num1.length, num2.length &lt;= 200</code></li>\n\t<li><code>num1</code> and <code>num2</code> consist of digits only.</li>\n\t<li>Both <code>num1</code> and <code>num2</code>&nbsp;do not contain any leading zero, except the number <code>0</code> itself.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/multiply-strings',
    solution_link: 'https://leetcode.com/problems/multiply-strings/solutions',
  },
  {
    id: 44,
    title: 'Wildcard Matching',
    difficulty: 'Hard',
    categories: ['String', 'Dynamic Programming', 'Greedy', '1+'],
    description:
      '<p>Given an input string (<code>s</code>) and a pattern (<code>p</code>), implement wildcard pattern matching with support for <code>\'?\'</code> and <code>\'*\'</code> where:</p>\n\n<ul>\n\t<li><code>\'?\'</code> Matches any single character.</li>\n\t<li><code>\'*\'</code> Matches any sequence of characters (including the empty sequence).</li>\n</ul>\n\n<p>The matching should cover the <strong>entire</strong> input string (not partial).</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "aa", p = "a"\n<strong>Output:</strong> false\n<strong>Explanation:</strong> "a" does not match the entire string "aa".\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "aa", p = "*"\n<strong>Output:</strong> true\n<strong>Explanation:</strong>&nbsp;\'*\' matches any sequence.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "cb", p = "?a"\n<strong>Output:</strong> false\n<strong>Explanation:</strong>&nbsp;\'?\' matches \'c\', but the second letter is \'a\', which does not match \'b\'.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length, p.length &lt;= 2000</code></li>\n\t<li><code>s</code> contains only lowercase English letters.</li>\n\t<li><code>p</code> contains only lowercase English letters, <code>\'?\'</code> or <code>\'*\'</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/wildcard-matching',
    solution_link: 'https://leetcode.com/problems/wildcard-matching/solutions',
  },
  {
    id: 45,
    title: 'Jump Game II',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming', 'Greedy'],
    description:
      '<p>You are given a <strong>0-indexed</strong> array of integers <code>nums</code> of length <code>n</code>. You are initially positioned at <code>nums[0]</code>.</p>\n\n<p>Each element <code>nums[i]</code> represents the maximum length of a forward jump from index <code>i</code>. In other words, if you are at <code>nums[i]</code>, you can jump to any <code>nums[i + j]</code> where:</p>\n\n<ul>\n\t<li><code>0 &lt;= j &lt;= nums[i]</code> and</li>\n\t<li><code>i + j &lt; n</code></li>\n</ul>\n\n<p>Return <em>the minimum number of jumps to reach </em><code>nums[n - 1]</code>. The test cases are generated such that you can reach <code>nums[n - 1]</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [2,3,1,1,4]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [2,3,0,1,4]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li>It\'s guaranteed that you can reach <code>nums[n - 1]</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/jump-game-ii',
    solution_link: 'https://leetcode.com/problems/jump-game-ii/solutions',
  },
  {
    id: 46,
    title: 'Permutations',
    difficulty: 'Medium',
    categories: ['Array', 'Backtracking'],
    description:
      '<p>Given an array <code>nums</code> of distinct integers, return <em>all the possible permutations</em>. You can return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [0,1]\n<strong>Output:</strong> [[0,1],[1,0]]\n</pre><p><strong class="example">Example 3:</strong></p>\n<pre><strong>Input:</strong> nums = [1]\n<strong>Output:</strong> [[1]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 6</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li>All the integers of <code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/permutations',
    solution_link: 'https://leetcode.com/problems/permutations/solutions',
  },
  {
    id: 47,
    title: 'Permutations II',
    difficulty: 'Medium',
    categories: ['Array', 'Backtracking'],
    description:
      '<p>Given a collection of numbers, <code>nums</code>,&nbsp;that might contain duplicates, return <em>all possible unique permutations <strong>in any order</strong>.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong>\n[[1,1,2],\n [1,2,1],\n [2,1,1]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 8</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/permutations-ii',
    solution_link: 'https://leetcode.com/problems/permutations-ii/solutions',
  },
  {
    id: 48,
    title: 'Rotate Image',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'Matrix'],
    description:
      '<p>You are given an <code>n x n</code> 2D <code>matrix</code> representing an image, rotate the image by <strong>90</strong> degrees (clockwise).</p>\n\n<p>You have to rotate the image <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a>, which means you have to modify the input 2D matrix directly. <strong>DO NOT</strong> allocate another 2D matrix and do the rotation.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg" style="width: 500px; height: 188px;">\n<pre><strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [[7,4,1],[8,5,2],[9,6,3]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg" style="width: 500px; height: 201px;">\n<pre><strong>Input:</strong> matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\n<strong>Output:</strong> [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == matrix.length == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n\t<li><code>-1000 &lt;= matrix[i][j] &lt;= 1000</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/rotate-image',
    solution_link: 'https://leetcode.com/problems/rotate-image/solutions',
  },
  {
    id: 49,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'String', '1+'],
    description:
      '<p>Given an array of strings <code>strs</code>, group <strong>the anagrams</strong> together. You can return the answer in <strong>any order</strong>.</p>\n\n<p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> strs = ["eat","tea","tan","ate","nat","bat"]\n<strong>Output:</strong> [["bat"],["nat","tan"],["ate","eat","tea"]]\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> strs = [""]\n<strong>Output:</strong> [[""]]\n</pre><p><strong class="example">Example 3:</strong></p>\n<pre><strong>Input:</strong> strs = ["a"]\n<strong>Output:</strong> [["a"]]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= strs[i].length &lt;= 100</code></li>\n\t<li><code>strs[i]</code> consists of lowercase English letters.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/group-anagrams',
    solution_link: 'https://leetcode.com/problems/group-anagrams/solutions',
  },
  {
    id: 50,
    title: 'Pow(x, n)',
    difficulty: 'Medium',
    categories: ['Math', 'Recursion'],
    description:
      '<p>Implement <a href="http://www.cplusplus.com/reference/valarray/pow/" target="_blank">pow(x, n)</a>, which calculates <code>x</code> raised to the power <code>n</code> (i.e., <code>x<sup>n</sup></code>).</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> x = 2.00000, n = 10\n<strong>Output:</strong> 1024.00000\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> x = 2.10000, n = 3\n<strong>Output:</strong> 9.26100\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> x = 2.00000, n = -2\n<strong>Output:</strong> 0.25000\n<strong>Explanation:</strong> 2<sup>-2</sup> = 1/2<sup>2</sup> = 1/4 = 0.25\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-100.0 &lt; x &lt; 100.0</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup>-1</code></li>\n\t<li><code>n</code> is an integer.</li>\n\t<li>Either <code>x</code> is not zero or <code>n &gt; 0</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sup>n</sup> &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/powx-n',
    solution_link: 'https://leetcode.com/problems/powx-n/solutions',
  },
  {
    id: 51,
    title: 'Sort Characters By Frequency',
    difficulty: 'Medium',
    categories: ['Hash Table', 'String', 'Sorting', '3+'],
    description:
      '<p>Given a string <code>s</code>, sort it in <strong>decreasing order</strong> based on the <strong>frequency</strong> of the characters. The <strong>frequency</strong> of a character is the number of times it appears in the string.</p>\n\n<p>Return <em>the sorted string</em>. If there are multiple answers, return <em>any of them</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "tree"\n<strong>Output:</strong> "eert"\n<strong>Explanation:</strong> \'e\' appears twice while \'r\' and \'t\' both appear once.\nSo \'e\' must appear before both \'r\' and \'t\'. Therefore "eetr" is also a valid answer.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "cccaaa"\n<strong>Output:</strong> "aaaccc"\n<strong>Explanation:</strong> Both \'c\' and \'a\' appear three times, so both "cccaaa" and "aaaccc" are valid answers.\nNote that "cacaca" is incorrect, as the same characters must be together.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "Aabb"\n<strong>Output:</strong> "bbAa"\n<strong>Explanation:</strong> "bbaA" is also a valid answer, but "Aabb" is incorrect.\nNote that \'A\' and \'a\' are treated as two different characters.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of uppercase and lowercase English letters and digits.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/sort-characters-by-frequency',
    solution_link:
      'https://leetcode.com/problems/sort-characters-by-frequency/solutions',
  },
  {
    id: 52,
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Medium',
    categories: ['Array', 'Greedy', 'Sorting'],
    description:
      '<p>There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array <code>points</code> where <code>points[i] = [x<sub>start</sub>, x<sub>end</sub>]</code> denotes a balloon whose <strong>horizontal diameter</strong> stretches between <code>x<sub>start</sub></code> and <code>x<sub>end</sub></code>. You do not know the exact y-coordinates of the balloons.</p>\n\n<p>Arrows can be shot up <strong>directly vertically</strong> (in the positive y-direction) from different points along the x-axis. A balloon with <code>x<sub>start</sub></code> and <code>x<sub>end</sub></code> is <strong>burst</strong> by an arrow shot at <code>x</code> if <code>x<sub>start</sub> &lt;= x &lt;= x<sub>end</sub></code>. There is <strong>no limit</strong> to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.</p>\n\n<p>Given the array <code>points</code>, return <em>the <strong>minimum</strong> number of arrows that must be shot to burst all balloons</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> points = [[10,16],[2,8],[1,6],[7,12]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The balloons can be burst by 2 arrows:\n- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].\n- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> points = [[1,2],[3,4],[5,6],[7,8]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> One arrow needs to be shot for each balloon for a total of 4 arrows.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> points = [[1,2],[2,3],[3,4],[4,5]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The balloons can be burst by 2 arrows:\n- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].\n- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= points.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>points[i].length == 2</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= x<sub>start</sub> &lt; x<sub>end</sub> &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons',
    solution_link:
      'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/solutions',
  },
  {
    id: 53,
    title: 'Minimum Moves to Equal Array Elements',
    difficulty: 'Medium',
    categories: ['Array', 'Math'],
    description:
      '<p>Given an integer array <code>nums</code> of size <code>n</code>, return <em>the minimum number of moves required to make all array elements equal</em>.</p>\n\n<p>In one move, you can increment <code>n - 1</code> elements of the array by <code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Only three moves are needed (remember each move increments two elements):\n[1,2,3]  =&gt;  [2,3,3]  =&gt;  [3,4,3]  =&gt;  [4,4,4]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,1,1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li>The answer is guaranteed to fit in a <strong>32-bit</strong> integer.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/minimum-moves-to-equal-array-elements',
    solution_link:
      'https://leetcode.com/problems/minimum-moves-to-equal-array-elements/solutions',
  },
  {
    id: 54,
    title: '4Sum II',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table'],
    description:
      '<p>Given four integer arrays <code>nums1</code>, <code>nums2</code>, <code>nums3</code>, and <code>nums4</code> all of length <code>n</code>, return the number of tuples <code>(i, j, k, l)</code> such that:</p>\n\n<ul>\n\t<li><code>0 &lt;= i, j, k, l &lt; n</code></li>\n\t<li><code>nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\nThe two tuples are:\n1. (0, 0, 0, 1) -&gt; nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0\n2. (1, 1, 0, 0) -&gt; nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums1.length</code></li>\n\t<li><code>n == nums2.length</code></li>\n\t<li><code>n == nums3.length</code></li>\n\t<li><code>n == nums4.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 200</code></li>\n\t<li><code>-2<sup>28</sup> &lt;= nums1[i], nums2[i], nums3[i], nums4[i] &lt;= 2<sup>28</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/4sum-ii',
    solution_link: 'https://leetcode.com/problems/4sum-ii/solutions',
  },
  {
    id: 55,
    title: 'Assign Cookies',
    difficulty: 'Easy',
    categories: ['Array', 'Two Pointers', 'Greedy', '1+'],
    description:
      '<p>Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.</p>\n\n<p>Each child <code>i</code> has a greed factor <code>g[i]</code>, which is the minimum size of a cookie that the child will be content with; and each cookie <code>j</code> has a size <code>s[j]</code>. If <code>s[j] &gt;= g[i]</code>, we can assign the cookie <code>j</code> to the child <code>i</code>, and the child <code>i</code> will be content. Your goal is to maximize the number of your content children and output the maximum number.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> g = [1,2,3], s = [1,1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. \nAnd even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.\nYou need to output 1.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> g = [1,2], s = [1,2,3]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. \nYou have 3 cookies and their sizes are big enough to gratify all of the children, \nYou need to output 2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= g.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= g[i], s[j] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/assign-cookies',
    solution_link: 'https://leetcode.com/problems/assign-cookies/solutions',
  },
  {
    id: 56,
    title: '132 Pattern',
    difficulty: 'Medium',
    categories: ['Array', 'Binary Search', 'Stack', '2+'],
    description:
      '<p>Given an array of <code>n</code> integers <code>nums</code>, a <strong>132 pattern</strong> is a subsequence of three integers <code>nums[i]</code>, <code>nums[j]</code> and <code>nums[k]</code> such that <code>i &lt; j &lt; k</code> and <code>nums[i] &lt; nums[k] &lt; nums[j]</code>.</p>\n\n<p>Return <code>true</code><em> if there is a <strong>132 pattern</strong> in </em><code>nums</code><em>, otherwise, return </em><code>false</code><em>.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no 132 pattern in the sequence.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [3,1,4,2]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a 132 pattern in the sequence: [1, 4, 2].\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [-1,3,2,0]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/132-pattern',
    solution_link: 'https://leetcode.com/problems/132-pattern/solutions',
  },
  {
    id: 57,
    title: 'Circular Array Loop',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Two Pointers'],
    description:
      '<p>You are playing a game involving a <strong>circular</strong> array of non-zero integers <code>nums</code>. Each <code>nums[i]</code> denotes the number of indices forward/backward you must move if you are located at index <code>i</code>:</p>\n\n<ul>\n\t<li>If <code>nums[i]</code> is positive, move <code>nums[i]</code> steps <strong>forward</strong>, and</li>\n\t<li>If <code>nums[i]</code> is negative, move <code>nums[i]</code> steps <strong>backward</strong>.</li>\n</ul>\n\n<p>Since the array is <strong>circular</strong>, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.</p>\n\n<p>A <strong>cycle</strong> in the array consists of a sequence of indices <code>seq</code> of length <code>k</code> where:</p>\n\n<ul>\n\t<li>Following the movement rules above results in the repeating index sequence <code>seq[0] -&gt; seq[1] -&gt; ... -&gt; seq[k - 1] -&gt; seq[0] -&gt; ...</code></li>\n\t<li>Every <code>nums[seq[j]]</code> is either <strong>all positive</strong> or <strong>all negative</strong>.</li>\n\t<li><code>k &gt; 1</code></li>\n</ul>\n\n<p>Return <code>true</code><em> if there is a <strong>cycle</strong> in </em><code>nums</code><em>, or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2022/09/01/img1.jpg" style="width: 402px; height: 289px;">\n<pre><strong>Input:</strong> nums = [2,-1,1,2,2]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.\nWe can see the cycle 0 --&gt; 2 --&gt; 3 --&gt; 0 --&gt; ..., and all of its nodes are white (jumping in the same direction).\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2022/09/01/img2.jpg" style="width: 402px; height: 390px;">\n<pre><strong>Input:</strong> nums = [-1,-2,-3,-4,-5,6]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.\nThe only cycle is of size 1, so we return false.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2022/09/01/img3.jpg" style="width: 497px; height: 242px;">\n<pre><strong>Input:</strong> nums = [1,-1,5,1,4]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The graph shows how the indices are connected. White nodes are jumping forward, while red is jumping backward.\nWe can see the cycle 0 --&gt; 1 --&gt; 0 --&gt; ..., and while it is of size &gt; 1, it has a node jumping forward and a node jumping backward, so <strong>it is not a cycle</strong>.\nWe can see the cycle 3 --&gt; 4 --&gt; 3 --&gt; ..., and all of its nodes are white (jumping in the same direction).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>nums[i] != 0</code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Could you solve it in <code>O(n)</code> time complexity and <code>O(1)</code> extra space complexity?</p>\n',
    question_link: 'https://leetcode.com/problems/circular-array-loop',
    solution_link:
      'https://leetcode.com/problems/circular-array-loop/solutions',
  },
  {
    id: 58,
    title: 'Poor Pigs',
    difficulty: 'Hard',
    categories: ['Math', 'Dynamic Programming', 'Combinatorics'],
    description:
      '<p>There are <code>buckets</code> buckets of liquid, where <strong>exactly one</strong> of the buckets is poisonous. To figure out which one is poisonous, you feed some number of (poor) pigs the liquid to see whether they will die or not. Unfortunately, you only have <code>minutesToTest</code> minutes to determine which bucket is poisonous.</p>\n\n<p>You can feed the pigs according to these steps:</p>\n\n<ol>\n\t<li>Choose some live pigs to feed.</li>\n\t<li>For each pig, choose which buckets to feed it. The pig will consume all the chosen buckets simultaneously and will take no time. Each pig can feed from any number of buckets, and each bucket can be fed from by any number of pigs.</li>\n\t<li>Wait for <code>minutesToDie</code> minutes. You may <strong>not</strong> feed any other pigs during this time.</li>\n\t<li>After <code>minutesToDie</code> minutes have passed, any pigs that have been fed the poisonous bucket will die, and all others will survive.</li>\n\t<li>Repeat this process until you run out of time.</li>\n</ol>\n\n<p>Given <code>buckets</code>, <code>minutesToDie</code>, and <code>minutesToTest</code>, return <em>the <strong>minimum</strong> number of pigs needed to figure out which bucket is poisonous within the allotted time</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> buckets = 4, minutesToDie = 15, minutesToTest = 15\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> We can determine the poisonous bucket as follows:\nAt time 0, feed the first pig buckets 1 and 2, and feed the second pig buckets 2 and 3.\nAt time 15, there are 4 possible outcomes:\n- If only the first pig dies, then bucket 1 must be poisonous.\n- If only the second pig dies, then bucket 3 must be poisonous.\n- If both pigs die, then bucket 2 must be poisonous.\n- If neither pig dies, then bucket 4 must be poisonous.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> buckets = 4, minutesToDie = 15, minutesToTest = 30\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> We can determine the poisonous bucket as follows:\nAt time 0, feed the first pig bucket 1, and feed the second pig bucket 2.\nAt time 15, there are 2 possible outcomes:\n- If either pig dies, then the poisonous bucket is the one it was fed.\n- If neither pig dies, then feed the first pig bucket 3, and feed the second pig bucket 4.\nAt time 30, one of the two pigs must die, and the poisonous bucket is the one it was fed.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= buckets &lt;= 1000</code></li>\n\t<li><code>1 &lt;=&nbsp;minutesToDie &lt;=&nbsp;minutesToTest &lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/poor-pigs',
    solution_link: 'https://leetcode.com/problems/poor-pigs/solutions',
  },
  {
    id: 59,
    title: 'Repeated Substring Pattern',
    difficulty: 'Easy',
    categories: ['String', 'String Matching'],
    description:
      '<p>Given a string <code>s</code>, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "abab"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> It is the substring "ab" twice.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "aba"\n<strong>Output:</strong> false\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "abcabcabcabc"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> It is the substring "abc" four times or the substring "abcabc" twice.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of lowercase English letters.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/repeated-substring-pattern',
    solution_link:
      'https://leetcode.com/problems/repeated-substring-pattern/solutions',
  },
  {
    id: 60,
    title: 'LFU Cache',
    difficulty: 'Hard',
    categories: ['Hash Table', 'Linked List', 'Design', '1+'],
    description:
      '<p>Design and implement a data structure for a <a href="https://en.wikipedia.org/wiki/Least_frequently_used" target="_blank">Least Frequently Used (LFU)</a> cache.</p>\n\n<p>Implement the <code>LFUCache</code> class:</p>\n\n<ul>\n\t<li><code>LFUCache(int capacity)</code> Initializes the object with the <code>capacity</code> of the data structure.</li>\n\t<li><code>int get(int key)</code> Gets the value of the <code>key</code> if the <code>key</code> exists in the cache. Otherwise, returns <code>-1</code>.</li>\n\t<li><code>void put(int key, int value)</code> Update the value of the <code>key</code> if present, or inserts the <code>key</code> if not already present. When the cache reaches its <code>capacity</code>, it should invalidate and remove the <strong>least frequently used</strong> key before inserting a new item. For this problem, when there is a <strong>tie</strong> (i.e., two or more keys with the same frequency), the <strong>least recently used</strong> <code>key</code> would be invalidated.</li>\n</ul>\n\n<p>To determine the least frequently used key, a <strong>use counter</strong> is maintained for each key in the cache. The key with the smallest <strong>use counter</strong> is the least frequently used key.</p>\n\n<p>When a key is first inserted into the cache, its <strong>use counter</strong> is set to <code>1</code> (due to the <code>put</code> operation). The <strong>use counter</strong> for a key in the cache is incremented either a <code>get</code> or <code>put</code> operation is called on it.</p>\n\n<p>The functions&nbsp;<code data-stringify-type="code">get</code>&nbsp;and&nbsp;<code data-stringify-type="code">put</code>&nbsp;must each run in <code>O(1)</code> average time complexity.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input</strong>\n["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]\n<strong>Output</strong>\n[null, null, null, 1, null, -1, 3, null, -1, 3, 4]\n\n<strong>Explanation</strong>\n// cnt(x) = the use counter for key x\n// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)\nLFUCache lfu = new LFUCache(2);\nlfu.put(1, 1);   // cache=[1,_], cnt(1)=1\nlfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1\nlfu.get(1);      // return 1\n                 // cache=[1,2], cnt(2)=1, cnt(1)=2\nlfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.\n&nbsp;                // cache=[3,1], cnt(3)=1, cnt(1)=2\nlfu.get(2);      // return -1 (not found)\nlfu.get(3);      // return 3\n                 // cache=[3,1], cnt(3)=2, cnt(1)=2\nlfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.\n                 // cache=[4,3], cnt(4)=1, cnt(3)=2\nlfu.get(1);      // return -1 (not found)\nlfu.get(3);      // return 3\n                 // cache=[3,4], cnt(4)=1, cnt(3)=3\nlfu.get(4);      // return 4\n                 // cache=[4,3], cnt(4)=2, cnt(3)=3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= capacity&nbsp;&lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= key &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= value &lt;= 10<sup>9</sup></code></li>\n\t<li>At most <code>2 * 10<sup>5</sup></code>&nbsp;calls will be made to <code>get</code> and <code>put</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<span style="display: none;">&nbsp;</span>',
    question_link: 'https://leetcode.com/problems/lfu-cache',
    solution_link: 'https://leetcode.com/problems/lfu-cache/solutions',
  },
  {
    id: 61,
    title: 'Hamming Distance',
    difficulty: 'Easy',
    categories: ['Bit Manipulation'],
    description:
      '<p>The <a href="https://en.wikipedia.org/wiki/Hamming_distance" target="_blank">Hamming distance</a> between two integers is the number of positions at which the corresponding bits are different.</p>\n\n<p>Given two integers <code>x</code> and <code>y</code>, return <em>the <strong>Hamming distance</strong> between them</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> x = 1, y = 4\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\n1   (0 0 0 1)\n4   (0 1 0 0)\n       \u2191   \u2191\nThe above arrows point to positions where the corresponding bits are different.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> x = 3, y = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;=&nbsp;x, y &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/hamming-distance',
    solution_link: 'https://leetcode.com/problems/hamming-distance/solutions',
  },
  {
    id: 62,
    title: 'Minimum Moves to Equal Array Elements II',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'Sorting'],
    description:
      '<p>Given an integer array <code>nums</code> of size <code>n</code>, return <em>the minimum number of moves required to make all array elements equal</em>.</p>\n\n<p>In one move, you can increment or decrement an element of the array by <code>1</code>.</p>\n\n<p>Test cases are designed so that the answer will fit in a <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\nOnly two moves are needed (remember each move increments or decrements one element):\n[<u>1</u>,2,3]  =&gt;  [2,2,<u>3</u>]  =&gt;  [2,2,2]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,10,2,9]\n<strong>Output:</strong> 16\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii',
    solution_link:
      'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/solutions',
  },
  {
    id: 63,
    title: 'Island Perimeter',
    difficulty: 'Easy',
    categories: ['Array', 'Depth-First Search', '2+'],
    description:
      '<p>You are given <code>row x col</code> <code>grid</code> representing a map where <code>grid[i][j] = 1</code> represents&nbsp;land and <code>grid[i][j] = 0</code> represents water.</p>\n\n<p>Grid cells are connected <strong>horizontally/vertically</strong> (not diagonally). The <code>grid</code> is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).</p>\n\n<p>The island doesn\'t have "lakes", meaning the water inside isn\'t connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don\'t exceed 100. Determine the perimeter of the island.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img src="https://assets.leetcode.com/uploads/2018/10/12/island.png" style="width: 221px; height: 213px;">\n<pre><strong>Input:</strong> grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]\n<strong>Output:</strong> 16\n<strong>Explanation:</strong> The perimeter is the 16 yellow stripes in the image above.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> grid = [[1]]\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> grid = [[1,0]]\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>row == grid.length</code></li>\n\t<li><code>col == grid[i].length</code></li>\n\t<li><code>1 &lt;= row, col &lt;= 100</code></li>\n\t<li><code>grid[i][j]</code> is <code>0</code> or <code>1</code>.</li>\n\t<li>There is exactly one island in <code>grid</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/island-perimeter',
    solution_link: 'https://leetcode.com/problems/island-perimeter/solutions',
  },
  {
    id: 64,
    title: 'Can I Win',
    difficulty: 'Medium',
    categories: ['Math', 'Dynamic Programming', '4+'],
    description:
      '<p>In the "100 game" two players take turns adding, to a running total, any integer from <code>1</code> to <code>10</code>. The player who first causes the running total to <strong>reach or exceed</strong> 100 wins.</p>\n\n<p>What if we change the game so that players <strong>cannot</strong> re-use integers?</p>\n\n<p>For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total &gt;= 100.</p>\n\n<p>Given two integers <code>maxChoosableInteger</code> and <code>desiredTotal</code>, return <code>true</code> if the first player to move can force a win, otherwise, return <code>false</code>. Assume both players play <strong>optimally</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> maxChoosableInteger = 10, desiredTotal = 11\n<strong>Output:</strong> false\n<strong>Explanation:</strong>\nNo matter which integer the first player choose, the first player will lose.\nThe first player can choose an integer from 1 up to 10.\nIf the first player choose 1, the second player can only choose integers from 2 up to 10.\nThe second player will win by choosing 10 and get a total = 11, which is &gt;= desiredTotal.\nSame with other integers chosen by the first player, the second player will always win.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> maxChoosableInteger = 10, desiredTotal = 0\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> maxChoosableInteger = 10, desiredTotal = 1\n<strong>Output:</strong> true\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= maxChoosableInteger &lt;= 20</code></li>\n\t<li><code>0 &lt;= desiredTotal &lt;= 300</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/can-i-win',
    solution_link: 'https://leetcode.com/problems/can-i-win/solutions',
  },
  {
    id: 66,
    title: 'Count The Repetitions',
    difficulty: 'Hard',
    categories: ['String', 'Dynamic Programming'],
    description:
      '<p>We define <code>str = [s, n]</code> as the string <code>str</code> which consists of the string <code>s</code> concatenated <code>n</code> times.</p>\n\n<ul>\n\t<li>For example, <code>str == ["abc", 3] =="abcabcabc"</code>.</li>\n</ul>\n\n<p>We define that string <code>s1</code> can be obtained from string <code>s2</code> if we can remove some characters from <code>s2</code> such that it becomes <code>s1</code>.</p>\n\n<ul>\n\t<li>For example, <code>s1 = "abc"</code> can be obtained from <code>s2 = "ab<strong><u>dbe</u></strong>c"</code> based on our definition by removing the bolded underlined characters.</li>\n</ul>\n\n<p>You are given two strings <code>s1</code> and <code>s2</code> and two integers <code>n1</code> and <code>n2</code>. You have the two strings <code>str1 = [s1, n1]</code> and <code>str2 = [s2, n2]</code>.</p>\n\n<p>Return <em>the maximum integer </em><code>m</code><em> such that </em><code>str = [str2, m]</code><em> can be obtained from </em><code>str1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> s1 = "acb", n1 = 4, s2 = "ab", n2 = 2\n<strong>Output:</strong> 2\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> s1 = "acb", n1 = 1, s2 = "acb", n2 = 1\n<strong>Output:</strong> 1\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s1.length, s2.length &lt;= 100</code></li>\n\t<li><code>s1</code> and <code>s2</code> consist of lowercase English letters.</li>\n\t<li><code>1 &lt;= n1, n2 &lt;= 10<sup>6</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/count-the-repetitions',
    solution_link:
      'https://leetcode.com/problems/count-the-repetitions/solutions',
  },
  {
    id: 67,
    title: 'Unique Substrings in Wraparound String',
    difficulty: 'Medium',
    categories: ['String', 'Dynamic Programming'],
    description:
      '<p>We define the string <code>base</code> to be the infinite wraparound string of <code>"abcdefghijklmnopqrstuvwxyz"</code>, so <code>base</code> will look like this:</p>\n\n<ul>\n\t<li><code>"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd...."</code>.</li>\n</ul>\n\n<p>Given a string <code>s</code>, return <em>the number of <strong>unique non-empty substrings</strong> of </em><code>s</code><em> are present in </em><code>base</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "a"\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> Only the substring "a" of s is in base.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "cac"\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There are two substrings ("a", "c") of s in base.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> s = "zab"\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> There are six substrings ("z", "a", "b", "za", "ab", and "zab") of s in base.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of lowercase English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/unique-substrings-in-wraparound-string',
    solution_link:
      'https://leetcode.com/problems/unique-substrings-in-wraparound-string/solutions',
  },
  {
    id: 68,
    title: 'Validate IP Address',
    difficulty: 'Medium',
    categories: ['String'],
    description:
      '<p>Given a string <code>queryIP</code>, return <code>"IPv4"</code> if IP is a valid IPv4 address, <code>"IPv6"</code> if IP is a valid IPv6 address or <code>"Neither"</code> if IP is not a correct IP of any type.</p>\n\n<p><strong>A valid IPv4</strong> address is an IP in the form <code>"x<sub>1</sub>.x<sub>2</sub>.x<sub>3</sub>.x<sub>4</sub>"</code> where <code>0 &lt;= x<sub>i</sub> &lt;= 255</code> and <code>x<sub>i</sub></code> <strong>cannot contain</strong> leading zeros. For example, <code>"192.168.1.1"</code> and <code>"192.168.1.0"</code> are valid IPv4 addresses while <code>"192.168.01.1"</code>, <code>"192.168.1.00"</code>, and <code>"192.168@1.1"</code> are invalid IPv4 addresses.</p>\n\n<p><strong>A valid IPv6</strong> address is an IP in the form <code>"x<sub>1</sub>:x<sub>2</sub>:x<sub>3</sub>:x<sub>4</sub>:x<sub>5</sub>:x<sub>6</sub>:x<sub>7</sub>:x<sub>8</sub>"</code> where:</p>\n\n<ul>\n\t<li><code>1 &lt;= x<sub>i</sub>.length &lt;= 4</code></li>\n\t<li><code>x<sub>i</sub></code> is a <strong>hexadecimal string</strong> which may contain digits, lowercase English letter (<code>\'a\'</code> to <code>\'f\'</code>) and upper-case English letters (<code>\'A\'</code> to <code>\'F\'</code>).</li>\n\t<li>Leading zeros are allowed in <code>x<sub>i</sub></code>.</li>\n</ul>\n\n<p>For example, "<code>2001:0db8:85a3:0000:0000:8a2e:0370:7334"</code> and "<code>2001:db8:85a3:0:0:8A2E:0370:7334"</code> are valid IPv6 addresses, while "<code>2001:0db8:85a3::8A2E:037j:7334"</code> and "<code>02001:0db8:85a3:0000:0000:8a2e:0370:7334"</code> are invalid IPv6 addresses.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> queryIP = "172.16.254.1"\n<strong>Output:</strong> "IPv4"\n<strong>Explanation:</strong> This is a valid IPv4 address, return "IPv4".\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"\n<strong>Output:</strong> "IPv6"\n<strong>Explanation:</strong> This is a valid IPv6 address, return "IPv6".\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> queryIP = "256.256.256.256"\n<strong>Output:</strong> "Neither"\n<strong>Explanation:</strong> This is neither a IPv4 address nor a IPv6 address.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>queryIP</code> consists only of English letters, digits and the characters <code>\'.\'</code> and <code>\':\'</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/validate-ip-address',
    solution_link:
      'https://leetcode.com/problems/validate-ip-address/solutions',
  },
  {
    id: 70,
    title: 'Implement Rand10() Using Rand7()',
    difficulty: 'Medium',
    categories: ['Math', 'Rejection Sampling', 'Randomized', '1+'],
    description:
      '<p>Given the <strong>API</strong> <code>rand7()</code> that generates a uniform random integer in the range <code>[1, 7]</code>, write a function <code>rand10()</code> that generates a uniform random integer in the range <code>[1, 10]</code>. You can only call the API <code>rand7()</code>, and you shouldn\'t call any other API. Please <strong>do not</strong> use a language\'s built-in random API.</p>\n\n<p>Each test case will have one <strong>internal</strong> argument <code>n</code>, the number of times that your implemented function <code>rand10()</code> will be called while testing. Note that this is <strong>not an argument</strong> passed to <code>rand10()</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> [2]\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 2\n<strong>Output:</strong> [2,8]\n</pre><p><strong class="example">Example 3:</strong></p>\n<pre><strong>Input:</strong> n = 3\n<strong>Output:</strong> [3,8,10]\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong></p>\n\n<ul>\n\t<li>What is the <a href="https://en.wikipedia.org/wiki/Expected_value" target="_blank">expected value</a> for the number of calls to <code>rand7()</code> function?</li>\n\t<li>Could you minimize the number of calls to <code>rand7()</code>?</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/implement-rand10-using-rand7',
    solution_link:
      'https://leetcode.com/problems/implement-rand10-using-rand7/solutions',
  },
  {
    id: 72,
    title: 'Concatenated Words',
    difficulty: 'Hard',
    categories: ['Array', 'String', 'Dynamic Programming', '2+'],
    description:
      '<p>Given an array of strings <code>words</code> (<strong>without duplicates</strong>), return <em>all the <strong>concatenated words</strong> in the given list of</em> <code>words</code>.</p>\n\n<p>A <strong>concatenated word</strong> is defined as a string that is comprised entirely of at least two shorter words (not necesssarily distinct)&nbsp;in the given array.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]\n<strong>Output:</strong> ["catsdogcats","dogcatsdog","ratcatdogcat"]\n<strong>Explanation:</strong> "catsdogcats" can be concatenated by "cats", "dog" and "cats"; \n"dogcatsdog" can be concatenated by "dog", "cats" and "dog"; \n"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> words = ["cat","dog","catdog"]\n<strong>Output:</strong> ["catdog"]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 30</code></li>\n\t<li><code>words[i]</code> consists of only lowercase English letters.</li>\n\t<li>All the strings of <code>words</code> are <strong>unique</strong>.</li>\n\t<li><code>1 &lt;= sum(words[i].length) &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/concatenated-words',
    solution_link: 'https://leetcode.com/problems/concatenated-words/solutions',
  },
  {
    id: 73,
    title: 'Matchsticks to Square',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming', '3+'],
    description:
      '<p>You are given an integer array <code>matchsticks</code> where <code>matchsticks[i]</code> is the length of the <code>i<sup>th</sup></code> matchstick. You want to use <strong>all the matchsticks</strong> to make one square. You <strong>should not break</strong> any stick, but you can link them up, and each matchstick must be used <strong>exactly one time</strong>.</p>\n\n<p>Return <code>true</code> if you can make this square and <code>false</code> otherwise.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/09/matchsticks1-grid.jpg" style="width: 253px; height: 253px;">\n<pre><strong>Input:</strong> matchsticks = [1,1,2,2,2]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> You can form a square with length 2, one side of the square came two sticks with length 1.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> matchsticks = [3,3,3,3,4]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> You cannot find a way to form a square with all the matchsticks.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= matchsticks.length &lt;= 15</code></li>\n\t<li><code>1 &lt;= matchsticks[i] &lt;= 10<sup>8</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/matchsticks-to-square',
    solution_link:
      'https://leetcode.com/problems/matchsticks-to-square/solutions',
  },
  {
    id: 74,
    title: 'Ones and Zeroes',
    difficulty: 'Medium',
    categories: ['Array', 'String', 'Dynamic Programming'],
    description:
      '<p>You are given an array of binary strings <code>strs</code> and two integers <code>m</code> and <code>n</code>.</p>\n\n<p>Return <em>the size of the largest subset of <code>strs</code> such that there are <strong>at most</strong> </em><code>m</code><em> </em><code>0</code><em>\'s and </em><code>n</code><em> </em><code>1</code><em>\'s in the subset</em>.</p>\n\n<p>A set <code>x</code> is a <strong>subset</strong> of a set <code>y</code> if all elements of <code>x</code> are also elements of <code>y</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> strs = ["10","0001","111001","1","0"], m = 5, n = 3\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The largest subset with at most 5 0\'s and 3 1\'s is {"10", "0001", "1", "0"}, so the answer is 4.\nOther valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.\n{"111001"} is an invalid subset because it contains 4 1\'s, greater than the maximum of 3.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> strs = ["10","0","1"], m = 1, n = 1\n<strong>Output:</strong> 2\n<b>Explanation:</b> The largest subset is {"0", "1"}, so the answer is 2.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 600</code></li>\n\t<li><code>1 &lt;= strs[i].length &lt;= 100</code></li>\n\t<li><code>strs[i]</code> consists only of digits <code>\'0\'</code> and <code>\'1\'</code>.</li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/ones-and-zeroes',
    solution_link: 'https://leetcode.com/problems/ones-and-zeroes/solutions',
  },
  {
    id: 75,
    title: 'Heaters',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'Binary Search', '1+'],
    description:
      '<p>Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses.</p>\n\n<p>Every house can be warmed, as long as the house is within the heater\'s warm radius range.&nbsp;</p>\n\n<p>Given the positions of <code>houses</code> and <code>heaters</code> on a horizontal line, return <em>the minimum radius standard of heaters&nbsp;so that those heaters could cover all houses.</em></p>\n\n<p><strong>Notice</strong> that&nbsp;all the <code>heaters</code> follow your radius standard, and the warm radius will the same.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> houses = [1,2,3], heaters = [2]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> houses = [1,2,3,4], heaters = [1,4]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The two heater was placed in the position 1 and 4. We need to use radius 1 standard, then all the houses can be warmed.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> houses = [1,5], heaters = [2]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= houses.length, heaters.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= houses[i], heaters[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/heaters',
    solution_link: 'https://leetcode.com/problems/heaters/solutions',
  },
  {
    id: 76,
    title: 'Number Complement',
    difficulty: 'Easy',
    categories: ['Bit Manipulation'],
    description:
      '<p>The <strong>complement</strong> of an integer is the integer you get when you flip all the <code>0</code>\'s to <code>1</code>\'s and all the <code>1</code>\'s to <code>0</code>\'s in its binary representation.</p>\n\n<ul>\n\t<li>For example, The integer <code>5</code> is <code>"101"</code> in binary and its <strong>complement</strong> is <code>"010"</code> which is the integer <code>2</code>.</li>\n</ul>\n\n<p>Given an integer <code>num</code>, return <em>its complement</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> num = 5\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> num = 1\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num &lt; 2<sup>31</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as 1009: <a href="https://leetcode.com/problems/complement-of-base-10-integer/" target="_blank">https://leetcode.com/problems/complement-of-base-10-integer/</a></p>\n',
    question_link: 'https://leetcode.com/problems/number-complement',
    solution_link: 'https://leetcode.com/problems/number-complement/solutions',
  },
  {
    id: 77,
    title: 'Total Hamming Distance',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'Bit Manipulation'],
    description:
      '<p>The <a href="https://en.wikipedia.org/wiki/Hamming_distance" target="_blank">Hamming distance</a> between two integers is the number of positions at which the corresponding bits are different.</p>\n\n<p>Given an integer array <code>nums</code>, return <em>the sum of <strong>Hamming distances</strong> between all the pairs of the integers in</em> <code>nums</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [4,14,2]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just\nshowing the four bits relevant in this case).\nThe answer will be:\nHammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [4,14,4]\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li>The answer for the given input will fit in a <strong>32-bit</strong> integer.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/total-hamming-distance',
    solution_link:
      'https://leetcode.com/problems/total-hamming-distance/solutions',
  },
  {
    id: 78,
    title: 'Generate Random Point in a Circle',
    difficulty: 'Medium',
    categories: ['Math', 'Geometry', 'Rejection Sampling', '1+'],
    description:
      '<p>Given the radius and the position of the center of a circle, implement the function <code>randPoint</code> which generates a uniform random point inside the circle.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(double radius, double x_center, double y_center)</code> initializes the object with the radius of the circle <code>radius</code> and the position of the center <code>(x_center, y_center)</code>.</li>\n\t<li><code>randPoint()</code> returns a random point inside the circle. A point on the circumference of the circle is considered to be in the circle. The answer is returned as an array <code>[x, y]</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input</strong>\n["Solution", "randPoint", "randPoint", "randPoint"]\n[[1.0, 0.0, 0.0], [], [], []]\n<strong>Output</strong>\n[null, [-0.02493, -0.38077], [0.82314, 0.38945], [0.36572, 0.17248]]\n\n<strong>Explanation</strong>\nSolution solution = new Solution(1.0, 0.0, 0.0);\nsolution.randPoint(); // return [-0.02493, -0.38077]\nsolution.randPoint(); // return [0.82314, 0.38945]\nsolution.randPoint(); // return [0.36572, 0.17248]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;&nbsp;radius &lt;= 10<sup>8</sup></code></li>\n\t<li><code>-10<sup>7</sup> &lt;= x_center, y_center &lt;= 10<sup>7</sup></code></li>\n\t<li>At most <code>3 * 10<sup>4</sup></code> calls will be made to <code>randPoint</code>.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/generate-random-point-in-a-circle',
    solution_link:
      'https://leetcode.com/problems/generate-random-point-in-a-circle/solutions',
  },
  {
    id: 79,
    title: 'Largest Palindrome Product',
    difficulty: 'Hard',
    categories: ['Math'],
    description:
      '<p>Given an integer n, return <em>the <strong>largest palindromic integer</strong> that can be represented as the product of two <code>n</code>-digits integers</em>. Since the answer can be very large, return it <strong>modulo</strong> <code>1337</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = 2\n<strong>Output:</strong> 987\nExplanation: 99 x 91 = 9009, 9009 % 1337 = 987\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> 9\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 8</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/largest-palindrome-product',
    solution_link:
      'https://leetcode.com/problems/largest-palindrome-product/solutions',
  },
  {
    id: 80,
    title: 'Sliding Window Median',
    difficulty: 'Hard',
    categories: ['Array', 'Hash Table', 'Sliding Window', '1+'],
    description:
      '<p>The <strong>median</strong> is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.</p>\n\n<ul>\n\t<li>For examples, if <code>arr = [2,<u>3</u>,4]</code>, the median is <code>3</code>.</li>\n\t<li>For examples, if <code>arr = [1,<u>2,3</u>,4]</code>, the median is <code>(2 + 3) / 2 = 2.5</code>.</li>\n</ul>\n\n<p>You are given an integer array <code>nums</code> and an integer <code>k</code>. There is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position.</p>\n\n<p>Return <em>the median array for each window in the original array</em>. Answers within <code>10<sup>-5</sup></code> of the actual value will be accepted.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3\n<strong>Output:</strong> [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]\n<strong>Explanation:</strong> \nWindow position                Median\n---------------                -----\n[<strong>1  3  -1</strong>] -3  5  3  6  7        1\n 1 [<strong>3  -1  -3</strong>] 5  3  6  7       -1\n 1  3 [<strong>-1  -3  5</strong>] 3  6  7       -1\n 1  3  -1 [<strong>-3  5  3</strong>] 6  7        3\n 1  3  -1  -3 [<strong>5  3  6</strong>] 7        5\n 1  3  -1  -3  5 [<strong>3  6  7</strong>]       6\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3,4,2,3,1,4,2], k = 3\n<strong>Output:</strong> [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/sliding-window-median',
    solution_link:
      'https://leetcode.com/problems/sliding-window-median/solutions',
  },
  {
    id: 81,
    title: 'Magical String',
    difficulty: 'Medium',
    categories: ['Two Pointers', 'String'],
    description:
      "<p>A magical string <code>s</code> consists of only <code>'1'</code> and <code>'2'</code> and obeys the following rules:</p>\n\n<ul>\n\t<li>The string s is magical because concatenating the number of contiguous occurrences of characters <code>'1'</code> and <code>'2'</code> generates the string <code>s</code> itself.</li>\n</ul>\n\n<p>The first few elements of <code>s</code> is <code>s = \"1221121221221121122\u2026\u2026\"</code>. If we group the consecutive <code>1</code>'s and <code>2</code>'s in <code>s</code>, it will be <code>\"1 22 11 2 1 22 1 22 11 2 11 22 ......\"</code> and the occurrences of <code>1</code>'s or <code>2</code>'s in each group are <code>\"1 2 2 1 1 2 1 2 2 1 2 2 ......\"</code>. You can see that the occurrence sequence is <code>s</code> itself.</p>\n\n<p>Given an integer <code>n</code>, return the number of <code>1</code>'s in the first <code>n</code> number in the magical string <code>s</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = 6\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The first 6 elements of magical string s is \"122112\" and it contains three 1's, so return 3.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    question_link: 'https://leetcode.com/problems/magical-string',
    solution_link: 'https://leetcode.com/problems/magical-string/solutions',
  },
  {
    id: 82,
    title: 'License Key Formatting',
    difficulty: 'Easy',
    categories: ['String'],
    description:
      '<p>You are given a license key represented as a string <code>s</code> that consists of only alphanumeric characters and dashes. The string is separated into <code>n + 1</code> groups by <code>n</code> dashes. You are also given an integer <code>k</code>.</p>\n\n<p>We want to reformat the string <code>s</code> such that each group contains exactly <code>k</code> characters, except for the first group, which could be shorter than <code>k</code> but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.</p>\n\n<p>Return <em>the reformatted license key</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "5F3Z-2e-9-w", k = 4\n<strong>Output:</strong> "5F3Z-2E9W"\n<strong>Explanation:</strong> The string s has been split into two parts, each part has 4 characters.\nNote that the two extra dashes are not needed and can be removed.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "2-5g-3-J", k = 2\n<strong>Output:</strong> "2-5G-3J"\n<strong>Explanation:</strong> The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> consists of English letters, digits, and dashes <code>\'-\'</code>.</li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/license-key-formatting',
    solution_link:
      'https://leetcode.com/problems/license-key-formatting/solutions',
  },
  {
    id: 83,
    title: 'Smallest Good Base',
    difficulty: 'Hard',
    categories: ['Math', 'Binary Search'],
    description:
      '<p>Given an integer <code>n</code> represented as a string, return <em>the smallest <strong>good base</strong> of</em> <code>n</code>.</p>\n\n<p>We call <code>k &gt;= 2</code> a <strong>good base</strong> of <code>n</code>, if all digits of <code>n</code> base <code>k</code> are <code>1</code>\'s.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = "13"\n<strong>Output:</strong> "3"\n<strong>Explanation:</strong> 13 base 3 is 111.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = "4681"\n<strong>Output:</strong> "8"\n<strong>Explanation:</strong> 4681 base 8 is 11111.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> n = "1000000000000000000"\n<strong>Output:</strong> "999999999999999999"\n<strong>Explanation:</strong> 1000000000000000000 base 999999999999999999 is 11.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n</code> is an integer in the range <code>[3, 10<sup>18</sup>]</code>.</li>\n\t<li><code>n</code> does not contain any leading zeros.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/smallest-good-base',
    solution_link: 'https://leetcode.com/problems/smallest-good-base/solutions',
  },
  {
    id: 85,
    title: 'Max Consecutive Ones',
    difficulty: 'Easy',
    categories: ['Array'],
    description:
      '<p>Given a binary array <code>nums</code>, return <em>the maximum number of consecutive </em><code>1</code><em>\'s in the array</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,1,0,1,1,1]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,0,1,1,0,1]\n<strong>Output:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums[i]</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/max-consecutive-ones',
    solution_link:
      'https://leetcode.com/problems/max-consecutive-ones/solutions',
  },
  {
    id: 86,
    title: 'Predict the Winner',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'Dynamic Programming', '2+'],
    description:
      '<p>You are given an integer array <code>nums</code>. Two players are playing a game with this array: player 1 and player 2.</p>\n\n<p>Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of <code>0</code>. At each turn, the player takes one of the numbers from either end of the array (i.e., <code>nums[0]</code> or <code>nums[nums.length - 1]</code>) which reduces the size of the array by <code>1</code>. The player adds the chosen number to their score. The game ends when there are no more elements in the array.</p>\n\n<p>Return <code>true</code> if Player 1 can win the game. If the scores of both players are equal, then player 1 is still the winner, and you should also return <code>true</code>. You may assume that both players are playing optimally.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,5,2]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Initially, player 1 can choose between 1 and 2. \nIf he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). \nSo, final score of player 1 is 1 + 2 = 3, and player 2 is 5. \nHence, player 1 will never be the winner and you need to return false.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,5,233,7]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Player 1 first chooses 1. Then player 2 has to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.\nFinally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 20</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>7</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/predict-the-winner',
    solution_link: 'https://leetcode.com/problems/predict-the-winner/solutions',
  },
  {
    id: 88,
    title: 'Zuma Game',
    difficulty: 'Hard',
    categories: ['String', 'Dynamic Programming', 'Stack', '2+'],
    description:
      "<p>You are playing a variation of the game Zuma.</p>\n\n<p>In this variation of Zuma, there is a <strong>single row</strong> of colored balls on a board, where each ball can be colored red <code>'R'</code>, yellow <code>'Y'</code>, blue <code>'B'</code>, green <code>'G'</code>, or white <code>'W'</code>. You also have several colored balls in your hand.</p>\n\n<p>Your goal is to <strong>clear all</strong> of the balls from the board. On each turn:</p>\n\n<ul>\n\t<li>Pick <strong>any</strong> ball from your hand and insert it in between two balls in the row or on either end of the row.</li>\n\t<li>If there is a group of <strong>three or more consecutive balls</strong> of the <strong>same color</strong>, remove the group of balls from the board.\n\t<ul>\n\t\t<li>If this removal causes more groups of three or more of the same color to form, then continue removing each group until there are none left.</li>\n\t</ul>\n\t</li>\n\t<li>If there are no more balls on the board, then you win the game.</li>\n\t<li>Repeat this process until you either win or do not have any more balls in your hand.</li>\n</ul>\n\n<p>Given a string <code>board</code>, representing the row of balls on the board, and a string <code>hand</code>, representing the balls in your hand, return <em>the <strong>minimum</strong> number of balls you have to insert to clear all the balls from the board. If you cannot clear all the balls from the board using the balls in your hand, return </em><code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> board = \"WRRBBW\", hand = \"RB\"\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> It is impossible to clear all the balls. The best you can do is:\n- Insert 'R' so the board becomes WRR<u>R</u>BBW. W<u>RRR</u>BBW -&gt; WBBW.\n- Insert 'B' so the board becomes WBB<u>B</u>W. W<u>BBB</u>W -&gt; WW.\nThere are still balls remaining on the board, and you are out of balls to insert.</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> board = \"WWRRBBWW\", hand = \"WRBRW\"\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> To make the board empty:\n- Insert 'R' so the board becomes WWRR<u>R</u>BBWW. WW<u>RRR</u>BBWW -&gt; WWBBWW.\n- Insert 'B' so the board becomes WWBB<u>B</u>WW. WW<u>BBB</u>WW -&gt; <u>WWWW</u> -&gt; empty.\n2 balls from your hand were needed to clear the board.\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> board = \"G\", hand = \"GGGGG\"\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> To make the board empty:\n- Insert 'G' so the board becomes G<u>G</u>.\n- Insert 'G' so the board becomes GG<u>G</u>. <u>GGG</u> -&gt; empty.\n2 balls from your hand were needed to clear the board.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= board.length &lt;= 16</code></li>\n\t<li><code>1 &lt;= hand.length &lt;= 5</code></li>\n\t<li><code>board</code> and <code>hand</code> consist of the characters <code>'R'</code>, <code>'Y'</code>, <code>'B'</code>, <code>'G'</code>, and <code>'W'</code>.</li>\n\t<li>The initial row of balls on the board will <strong>not</strong> have any groups of three or more consecutive balls of the same color.</li>\n</ul>\n",
    question_link: 'https://leetcode.com/problems/zuma-game',
    solution_link: 'https://leetcode.com/problems/zuma-game/solutions',
  },
  {
    id: 91,
    title: 'Non-decreasing Subsequences',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Backtracking', '1+'],
    description:
      '<p>Given an integer array <code>nums</code>, return <em>all the different possible non-decreasing subsequences of the given array with at least two elements</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [4,6,7,7]\n<strong>Output:</strong> [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [4,4,3,2,1]\n<strong>Output:</strong> [[4,4]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 15</code></li>\n\t<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/non-decreasing-subsequences',
    solution_link:
      'https://leetcode.com/problems/non-decreasing-subsequences/solutions',
  },
  {
    id: 92,
    title: 'Construct the Rectangle',
    difficulty: 'Easy',
    categories: ['Math'],
    description:
      '<p>A web developer needs to know how to design a web page\'s size. So, given a specific rectangular web page\u2019s area, your job by now is to design a rectangular web page, whose length L and width W satisfy the following requirements:</p>\n\n<ol>\n\t<li>The area of the rectangular web page you designed must equal to the given target area.</li>\n\t<li>The width <code>W</code> should not be larger than the length <code>L</code>, which means <code>L &gt;= W</code>.</li>\n\t<li>The difference between length <code>L</code> and width <code>W</code> should be as small as possible.</li>\n</ol>\n\n<p>Return <em>an array <code>[L, W]</code> where <code>L</code> and <code>W</code> are the length and width of the&nbsp;web page you designed in sequence.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> area = 4\n<strong>Output:</strong> [2,2]\n<strong>Explanation:</strong> The target area is 4, and all the possible ways to construct it are [1,4], [2,2], [4,1]. \nBut according to requirement 2, [1,4] is illegal; according to requirement 3,  [4,1] is not optimal compared to [2,2]. So the length L is 2, and the width W is 2.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> area = 37\n<strong>Output:</strong> [37,1]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> area = 122122\n<strong>Output:</strong> [427,286]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= area &lt;= 10<sup>7</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/construct-the-rectangle',
    solution_link:
      'https://leetcode.com/problems/construct-the-rectangle/solutions',
  },
  {
    id: 93,
    title: 'Reverse Pairs',
    difficulty: 'Hard',
    categories: ['Array', 'Binary Search', 'Divide and Conquer', '4+'],
    description:
      '<p>Given an integer array <code>nums</code>, return <em>the number of <strong>reverse pairs</strong> in the array</em>.</p>\n\n<p>A <strong>reverse pair</strong> is a pair <code>(i, j)</code> where:</p>\n\n<ul>\n\t<li><code>0 &lt;= i &lt; j &lt; nums.length</code> and</li>\n\t<li><code>nums[i] &gt; 2 * nums[j]</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,3,2,3,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The reverse pairs are:\n(1, 4) --&gt; nums[1] = 3, nums[4] = 1, 3 &gt; 2 * 1\n(3, 4) --&gt; nums[3] = 3, nums[4] = 1, 3 &gt; 2 * 1\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [2,4,3,5,1]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The reverse pairs are:\n(1, 4) --&gt; nums[1] = 4, nums[4] = 1, 4 &gt; 2 * 1\n(2, 4) --&gt; nums[2] = 3, nums[4] = 1, 3 &gt; 2 * 1\n(3, 4) --&gt; nums[3] = 5, nums[4] = 1, 5 &gt; 2 * 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/reverse-pairs',
    solution_link: 'https://leetcode.com/problems/reverse-pairs/solutions',
  },
  {
    id: 94,
    title: 'Target Sum',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming', 'Backtracking'],
    description:
      "<p>You are given an integer array <code>nums</code> and an integer <code>target</code>.</p>\n\n<p>You want to build an <strong>expression</strong> out of nums by adding one of the symbols <code>'+'</code> and <code>'-'</code> before each integer in nums and then concatenate all the integers.</p>\n\n<ul>\n\t<li>For example, if <code>nums = [2, 1]</code>, you can add a <code>'+'</code> before <code>2</code> and a <code>'-'</code> before <code>1</code> and concatenate them to build the expression <code>\"+2-1\"</code>.</li>\n</ul>\n\n<p>Return the number of different <strong>expressions</strong> that you can build, which evaluates to <code>target</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,1,1,1,1], target = 3\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> There are 5 ways to assign symbols to make the sum of nums be target 3.\n-1 + 1 + 1 + 1 + 1 = 3\n+1 - 1 + 1 + 1 + 1 = 3\n+1 + 1 - 1 + 1 + 1 = 3\n+1 + 1 + 1 - 1 + 1 = 3\n+1 + 1 + 1 + 1 - 1 = 3\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1], target = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 20</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>0 &lt;= sum(nums[i]) &lt;= 1000</code></li>\n\t<li><code>-1000 &lt;= target &lt;= 1000</code></li>\n</ul>\n",
    question_link: 'https://leetcode.com/problems/target-sum',
    solution_link: 'https://leetcode.com/problems/target-sum/solutions',
  },
  {
    id: 95,
    title: 'Teemo Attacking',
    difficulty: 'Easy',
    categories: ['Array', 'Simulation'],
    description:
      '<p>Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for a exactly <code>duration</code> seconds. More formally, an attack at second <code>t</code> will mean Ashe is poisoned during the <strong>inclusive</strong> time interval <code>[t, t + duration - 1]</code>. If Teemo attacks again <strong>before</strong> the poison effect ends, the timer for it is <strong>reset</strong>, and the poison effect will end <code>duration</code> seconds after the new attack.</p>\n\n<p>You are given a <strong>non-decreasing</strong> integer array <code>timeSeries</code>, where <code>timeSeries[i]</code> denotes that Teemo attacks Ashe at second <code>timeSeries[i]</code>, and an integer <code>duration</code>.</p>\n\n<p>Return <em>the <strong>total</strong> number of seconds that Ashe is poisoned</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> timeSeries = [1,4], duration = 2\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Teemo\'s attacks on Ashe go as follows:\n- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.\n- At second 4, Teemo attacks, and Ashe is poisoned for seconds 4 and 5.\nAshe is poisoned for seconds 1, 2, 4, and 5, which is 4 seconds in total.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> timeSeries = [1,2], duration = 2\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Teemo\'s attacks on Ashe go as follows:\n- At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.\n- At second 2 however, Teemo attacks again and resets the poison timer. Ashe is poisoned for seconds 2 and 3.\nAshe is poisoned for seconds 1, 2, and 3, which is 3 seconds in total.</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= timeSeries.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= timeSeries[i], duration &lt;= 10<sup>7</sup></code></li>\n\t<li><code>timeSeries</code> is sorted in <strong>non-decreasing</strong> order.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/teemo-attacking',
    solution_link: 'https://leetcode.com/problems/teemo-attacking/solutions',
  },
  {
    id: 96,
    title: 'Next Greater Element I',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table', 'Stack', '1+'],
    description:
      '<p>The <strong>next greater element</strong> of some element <code>x</code> in an array is the <strong>first greater</strong> element that is <strong>to the right</strong> of <code>x</code> in the same array.</p>\n\n<p>You are given two <strong>distinct 0-indexed</strong> integer arrays <code>nums1</code> and <code>nums2</code>, where <code>nums1</code> is a subset of <code>nums2</code>.</p>\n\n<p>For each <code>0 &lt;= i &lt; nums1.length</code>, find the index <code>j</code> such that <code>nums1[i] == nums2[j]</code> and determine the <strong>next greater element</strong> of <code>nums2[j]</code> in <code>nums2</code>. If there is no next greater element, then the answer for this query is <code>-1</code>.</p>\n\n<p>Return <em>an array </em><code>ans</code><em> of length </em><code>nums1.length</code><em> such that </em><code>ans[i]</code><em> is the <strong>next greater element</strong> as described above.</em></p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums1 = [4,1,2], nums2 = [1,3,4,2]\n<strong>Output:</strong> [-1,3,-1]\n<strong>Explanation:</strong> The next greater element for each value of nums1 is as follows:\n- 4 is underlined in nums2 = [1,3,<u>4</u>,2]. There is no next greater element, so the answer is -1.\n- 1 is underlined in nums2 = [<u>1</u>,3,4,2]. The next greater element is 3.\n- 2 is underlined in nums2 = [1,3,4,<u>2</u>]. There is no next greater element, so the answer is -1.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums1 = [2,4], nums2 = [1,2,3,4]\n<strong>Output:</strong> [3,-1]\n<strong>Explanation:</strong> The next greater element for each value of nums1 is as follows:\n- 2 is underlined in nums2 = [1,<u>2</u>,3,4]. The next greater element is 3.\n- 4 is underlined in nums2 = [1,2,3,<u>4</u>]. There is no next greater element, so the answer is -1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums1.length &lt;= nums2.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 10<sup>4</sup></code></li>\n\t<li>All integers in <code>nums1</code> and <code>nums2</code> are <strong>unique</strong>.</li>\n\t<li>All the integers of <code>nums1</code> also appear in <code>nums2</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you find an <code>O(nums1.length + nums2.length)</code> solution?',
    question_link: 'https://leetcode.com/problems/next-greater-element-i',
    solution_link:
      'https://leetcode.com/problems/next-greater-element-i/solutions',
  },
  {
    id: 97,
    title: 'Random Point in Non-overlapping Rectangles',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'Binary Search', '4+'],
    description:
      '<p>You are given an array of non-overlapping axis-aligned rectangles <code>rects</code> where <code>rects[i] = [a<sub>i</sub>, b<sub>i</sub>, x<sub>i</sub>, y<sub>i</sub>]</code> indicates that <code>(a<sub>i</sub>, b<sub>i</sub>)</code> is the bottom-left corner point of the <code>i<sup>th</sup></code> rectangle and <code>(x<sub>i</sub>, y<sub>i</sub>)</code> is the top-right corner point of the <code>i<sup>th</sup></code> rectangle. Design an algorithm to pick a random integer point inside the space covered by one of the given rectangles. A point on the perimeter of a rectangle is included in the space covered by the rectangle.</p>\n\n<p>Any integer point inside the space covered by one of the given rectangles should be equally likely to be returned.</p>\n\n<p><strong>Note</strong> that an integer point is a point that has integer coordinates.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(int[][] rects)</code> Initializes the object with the given rectangles <code>rects</code>.</li>\n\t<li><code>int[] pick()</code> Returns a random integer point <code>[u, v]</code> inside the space covered by one of the given rectangles.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/07/24/lc-pickrandomrec.jpg" style="width: 419px; height: 539px;">\n<pre><strong>Input</strong>\n["Solution", "pick", "pick", "pick", "pick", "pick"]\n[[[[-2, -2, 1, 1], [2, 2, 4, 6]]], [], [], [], [], []]\n<strong>Output</strong>\n[null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]\n\n<strong>Explanation</strong>\nSolution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);\nsolution.pick(); // return [1, -2]\nsolution.pick(); // return [1, -1]\nsolution.pick(); // return [-1, -2]\nsolution.pick(); // return [-2, -2]\nsolution.pick(); // return [0, 0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= rects.length &lt;= 100</code></li>\n\t<li><code>rects[i].length == 4</code></li>\n\t<li><code>-10<sup>9</sup> &lt;= a<sub>i</sub> &lt; x<sub>i</sub> &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= b<sub>i</sub> &lt; y<sub>i</sub> &lt;= 10<sup>9</sup></code></li>\n\t<li><code>x<sub>i</sub> - a<sub>i</sub> &lt;= 2000</code></li>\n\t<li><code>y<sub>i</sub> - b<sub>i</sub> &lt;= 2000</code></li>\n\t<li>All the rectangles do not overlap.</li>\n\t<li>At most <code>10<sup>4</sup></code> calls will be made to <code>pick</code>.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/random-point-in-non-overlapping-rectangles',
    solution_link:
      'https://leetcode.com/problems/random-point-in-non-overlapping-rectangles/solutions',
  },
  {
    id: 98,
    title: 'Diagonal Traverse',
    difficulty: 'Medium',
    categories: ['Array', 'Matrix', 'Simulation'],
    description:
      '<p>Given an <code>m x n</code> matrix <code>mat</code>, return <em>an array of all the elements of the array in a diagonal order</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/10/diag1-grid.jpg" style="width: 334px; height: 334px;">\n<pre><strong>Input:</strong> mat = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [1,2,4,7,5,3,6,8,9]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> mat = [[1,2],[3,4]]\n<strong>Output:</strong> [1,2,3,4]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == mat.length</code></li>\n\t<li><code>n == mat[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>5</sup> &lt;= mat[i][j] &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/diagonal-traverse',
    solution_link: 'https://leetcode.com/problems/diagonal-traverse/solutions',
  },
  {
    id: 100,
    title: 'Keyboard Row',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table', 'String'],
    description:
      '<p>Given an array of strings <code>words</code>, return <em>the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below</em>.</p>\n\n<p>In the <strong>American keyboard</strong>:</p>\n\n<ul>\n\t<li>the first row consists of the characters <code>"qwertyuiop"</code>,</li>\n\t<li>the second row consists of the characters <code>"asdfghjkl"</code>, and</li>\n\t<li>the third row consists of the characters <code>"zxcvbnm"</code>.</li>\n</ul>\n<img alt="" src="https://assets.leetcode.com/uploads/2018/10/12/keyboard.png" style="width: 800px; max-width: 600px; height: 267px;">\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> words = ["Hello","Alaska","Dad","Peace"]\n<strong>Output:</strong> ["Alaska","Dad"]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> words = ["omk"]\n<strong>Output:</strong> []\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> words = ["adsdf","sfd"]\n<strong>Output:</strong> ["adsdf","sfd"]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= words.length &lt;= 20</code></li>\n\t<li><code>1 &lt;= words[i].length &lt;= 100</code></li>\n\t<li><code>words[i]</code> consists of English letters (both lowercase and uppercase).&nbsp;</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/keyboard-row',
    solution_link: 'https://leetcode.com/problems/keyboard-row/solutions',
  },
  {
    id: 101,
    title: 'Find Mode in Binary Search Tree',
    difficulty: 'Easy',
    categories: ['Tree', 'Depth-First Search', '2+'],
    description:
      '<p>Given the <code>root</code> of a binary search tree (BST) with duplicates, return <em>all the <a href="https://en.wikipedia.org/wiki/Mode_(statistics)" target="_blank">mode(s)</a> (i.e., the most frequently occurred element) in it</em>.</p>\n\n<p>If the tree has more than one mode, return them in <strong>any order</strong>.</p>\n\n<p>Assume a BST is defined as follows:</p>\n\n<ul>\n\t<li>The left subtree of a node contains only nodes with keys <strong>less than or equal to</strong> the node\'s key.</li>\n\t<li>The right subtree of a node contains only nodes with keys <strong>greater than or equal to</strong> the node\'s key.</li>\n\t<li>Both the left and right subtrees must also be binary search trees.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/03/11/mode-tree.jpg" style="width: 142px; height: 222px;">\n<pre><strong>Input:</strong> root = [1,null,2,2]\n<strong>Output:</strong> [2]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> root = [0]\n<strong>Output:</strong> [0]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).',
    question_link:
      'https://leetcode.com/problems/find-mode-in-binary-search-tree',
    solution_link:
      'https://leetcode.com/problems/find-mode-in-binary-search-tree/solutions',
  },
  {
    id: 102,
    title: 'IPO',
    difficulty: 'Hard',
    categories: ['Array', 'Greedy', 'Sorting', '1+'],
    description:
      '<p>Suppose LeetCode will start its <strong>IPO</strong> soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the <strong>IPO</strong>. Since it has limited resources, it can only finish at most <code>k</code> distinct projects before the <strong>IPO</strong>. Help LeetCode design the best way to maximize its total capital after finishing at most <code>k</code> distinct projects.</p>\n\n<p>You are given <code>n</code> projects where the <code>i<sup>th</sup></code> project has a pure profit <code>profits[i]</code> and a minimum capital of <code>capital[i]</code> is needed to start it.</p>\n\n<p>Initially, you have <code>w</code> capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.</p>\n\n<p>Pick a list of <strong>at most</strong> <code>k</code> distinct projects from given projects to <strong>maximize your final capital</strong>, and return <em>the final maximized capital</em>.</p>\n\n<p>The answer is guaranteed to fit in a 32-bit signed integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Since your initial capital is 0, you can only start the project indexed 0.\nAfter finishing it you will obtain profit 1 and your capital becomes 1.\nWith capital 1, you can either start the project indexed 1 or the project indexed 2.\nSince you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.\nTherefore, output the final maximized capital, which is 0 + 1 + 3 = 4.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]\n<strong>Output:</strong> 6\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= w &lt;= 10<sup>9</sup></code></li>\n\t<li><code>n == profits.length</code></li>\n\t<li><code>n == capital.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= profits[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= capital[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/ipo',
    solution_link: 'https://leetcode.com/problems/ipo/solutions',
  },
  {
    id: 103,
    title: 'Next Greater Element II',
    difficulty: 'Medium',
    categories: ['Array', 'Stack', 'Monotonic Stack'],
    description:
      '<p>Given a circular integer array <code>nums</code> (i.e., the next element of <code>nums[nums.length - 1]</code> is <code>nums[0]</code>), return <em>the <strong>next greater number</strong> for every element in</em> <code>nums</code>.</p>\n\n<p>The <strong>next greater number</strong> of a number <code>x</code> is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn\'t exist, return <code>-1</code> for this number.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,1]\n<strong>Output:</strong> [2,-1,2]\nExplanation: The first 1\'s next greater number is 2; \nThe number 2 can\'t find next greater number. \nThe second 1\'s next greater number needs to search circularly, which is also 2.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3,4,3]\n<strong>Output:</strong> [2,3,4,-1,4]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/next-greater-element-ii',
    solution_link:
      'https://leetcode.com/problems/next-greater-element-ii/solutions',
  },
  {
    id: 104,
    title: 'Base 7',
    difficulty: 'Easy',
    categories: ['Math'],
    description:
      '<p>Given an integer <code>num</code>, return <em>a string of its <strong>base 7</strong> representation</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> num = 100\n<strong>Output:</strong> "202"\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> num = -7\n<strong>Output:</strong> "-10"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>7</sup> &lt;= num &lt;= 10<sup>7</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/base-7',
    solution_link: 'https://leetcode.com/problems/base-7/solutions',
  },
  {
    id: 106,
    title: 'Relative Ranks',
    difficulty: 'Easy',
    categories: ['Array', 'Sorting', 'Heap (Priority Queue)'],
    description:
      '<p>You are given an integer array <code>score</code> of size <code>n</code>, where <code>score[i]</code> is the score of the <code>i<sup>th</sup></code> athlete in a competition. All the scores are guaranteed to be <strong>unique</strong>.</p>\n\n<p>The athletes are <strong>placed</strong> based on their scores, where the <code>1<sup>st</sup></code> place athlete has the highest score, the <code>2<sup>nd</sup></code> place athlete has the <code>2<sup>nd</sup></code> highest score, and so on. The placement of each athlete determines their rank:</p>\n\n<ul>\n\t<li>The <code>1<sup>st</sup></code> place athlete\'s rank is <code>"Gold Medal"</code>.</li>\n\t<li>The <code>2<sup>nd</sup></code> place athlete\'s rank is <code>"Silver Medal"</code>.</li>\n\t<li>The <code>3<sup>rd</sup></code> place athlete\'s rank is <code>"Bronze Medal"</code>.</li>\n\t<li>For the <code>4<sup>th</sup></code> place to the <code>n<sup>th</sup></code> place athlete, their rank is their placement number (i.e., the <code>x<sup>th</sup></code> place athlete\'s rank is <code>"x"</code>).</li>\n</ul>\n\n<p>Return an array <code>answer</code> of size <code>n</code> where <code>answer[i]</code> is the <strong>rank</strong> of the <code>i<sup>th</sup></code> athlete.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> score = [5,4,3,2,1]\n<strong>Output:</strong> ["Gold Medal","Silver Medal","Bronze Medal","4","5"]\n<strong>Explanation:</strong> The placements are [1<sup>st</sup>, 2<sup>nd</sup>, 3<sup>rd</sup>, 4<sup>th</sup>, 5<sup>th</sup>].</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> score = [10,3,8,9,4]\n<strong>Output:</strong> ["Gold Medal","5","Bronze Medal","Silver Medal","4"]\n<strong>Explanation:</strong> The placements are [1<sup>st</sup>, 5<sup>th</sup>, 3<sup>rd</sup>, 2<sup>nd</sup>, 4<sup>th</sup>].\n\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == score.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= score[i] &lt;= 10<sup>6</sup></code></li>\n\t<li>All the values in <code>score</code> are <strong>unique</strong>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/relative-ranks',
    solution_link: 'https://leetcode.com/problems/relative-ranks/solutions',
  },
  {
    id: 107,
    title: 'Perfect Number',
    difficulty: 'Easy',
    categories: ['Math'],
    description:
      '<p>A <a href="https://en.wikipedia.org/wiki/Perfect_number" target="_blank"><strong>perfect number</strong></a> is a <strong>positive integer</strong> that is equal to the sum of its <strong>positive divisors</strong>, excluding the number itself. A <strong>divisor</strong> of an integer <code>x</code> is an integer that can divide <code>x</code> evenly.</p>\n\n<p>Given an integer <code>n</code>, return <code>true</code><em> if </em><code>n</code><em> is a perfect number, otherwise return </em><code>false</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> num = 28\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 28 = 1 + 2 + 4 + 7 + 14\n1, 2, 4, 7, and 14 are all divisors of 28.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> num = 7\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= num &lt;= 10<sup>8</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/perfect-number',
    solution_link: 'https://leetcode.com/problems/perfect-number/solutions',
  },
  {
    id: 108,
    title: 'Most Frequent Subtree Sum',
    difficulty: 'Medium',
    categories: ['Hash Table', 'Tree', 'Depth-First Search', '1+'],
    description:
      '<p>Given the <code>root</code> of a binary tree, return the most frequent <strong>subtree sum</strong>. If there is a tie, return all the values with the highest frequency in any order.</p>\n\n<p>The <strong>subtree sum</strong> of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/freq1-tree.jpg" style="width: 207px; height: 183px;">\n<pre><strong>Input:</strong> root = [5,2,-3]\n<strong>Output:</strong> [2,-3,4]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/freq2-tree.jpg" style="width: 207px; height: 183px;">\n<pre><strong>Input:</strong> root = [5,2,-5]\n<strong>Output:</strong> [2]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/most-frequent-subtree-sum',
    solution_link:
      'https://leetcode.com/problems/most-frequent-subtree-sum/solutions',
  },
  {
    id: 109,
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    categories: ['Math', 'Dynamic Programming', 'Recursion', '1+'],
    description:
      '<p>The <b>Fibonacci numbers</b>, commonly denoted <code>F(n)</code> form a sequence, called the <b>Fibonacci sequence</b>, such that each number is the sum of the two preceding ones, starting from <code>0</code> and <code>1</code>. That is,</p>\n\n<pre>F(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n &gt; 1.\n</pre>\n\n<p>Given <code>n</code>, calculate <code>F(n)</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = 2\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> F(2) = F(1) + F(0) = 1 + 0 = 1.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = 3\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> F(3) = F(2) + F(1) = 1 + 1 = 2.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> n = 4\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> F(4) = F(3) + F(2) = 2 + 1 = 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 30</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/fibonacci-number',
    solution_link: 'https://leetcode.com/problems/fibonacci-number/solutions',
  },
  {
    id: 111,
    title: 'Game Play Analysis I',
    difficulty: 'Easy',
    categories: ['Database'],
    description:
      '<p>Table: <code>Activity</code></p>\n\n<pre>+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| player_id    | int     |\n| device_id    | int     |\n| event_date   | date    |\n| games_played | int     |\n+--------------+---------+\n(player_id, event_date) is the primary key (combination of columns with unique values) of this table.\nThis table shows the activity of players of some games.\nEach row is a record of a player who logged in and played a number of games (possibly 0) before logging out on someday using some device.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the <strong>first login date</strong> for each player.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nActivity table:\n+-----------+-----------+------------+--------------+\n| player_id | device_id | event_date | games_played |\n+-----------+-----------+------------+--------------+\n| 1         | 2         | 2016-03-01 | 5            |\n| 1         | 2         | 2016-05-02 | 6            |\n| 2         | 3         | 2017-06-25 | 1            |\n| 3         | 1         | 2016-03-02 | 0            |\n| 3         | 4         | 2018-07-03 | 5            |\n+-----------+-----------+------------+--------------+\n<strong>Output:</strong> \n+-----------+-------------+\n| player_id | first_login |\n+-----------+-------------+\n| 1         | 2016-03-01  |\n| 2         | 2017-06-25  |\n| 3         | 2016-03-02  |\n+-----------+-------------+\n</pre>\n',
    question_link: 'https://leetcode.com/problems/game-play-analysis-i',
    solution_link:
      'https://leetcode.com/problems/game-play-analysis-i/solutions',
  },
  {
    id: 113,
    title: 'Find Bottom Left Tree Value',
    difficulty: 'Medium',
    categories: ['Tree', 'Depth-First Search', '2+'],
    description:
      '<p>Given the <code>root</code> of a binary tree, return the leftmost value in the last row of the tree.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/12/14/tree1.jpg" style="width: 302px; height: 182px;">\n<pre><strong>Input:</strong> root = [2,1,3]\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/12/14/tree2.jpg" style="width: 432px; height: 421px;">\n<pre><strong>Input:</strong> root = [1,2,3,4,null,5,6,null,null,7]\n<strong>Output:</strong> 7\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/find-bottom-left-tree-value',
    solution_link:
      'https://leetcode.com/problems/find-bottom-left-tree-value/solutions',
  },
  {
    id: 114,
    title: 'Freedom Trail',
    difficulty: 'Hard',
    categories: ['String', 'Dynamic Programming', '2+'],
    description:
      '<p>In the video game Fallout 4, the quest <strong>"Road to Freedom"</strong> requires players to reach a metal dial called the <strong>"Freedom Trail Ring"</strong> and use the dial to spell a specific keyword to open the door.</p>\n\n<p>Given a string <code>ring</code> that represents the code engraved on the outer ring and another string <code>key</code> that represents the keyword that needs to be spelled, return <em>the minimum number of steps to spell all the characters in the keyword</em>.</p>\n\n<p>Initially, the first character of the ring is aligned at the <code>"12:00"</code> direction. You should spell all the characters in <code>key</code> one by one by rotating <code>ring</code> clockwise or anticlockwise to make each character of the string key aligned at the <code>"12:00"</code> direction and then by pressing the center button.</p>\n\n<p>At the stage of rotating the ring to spell the key character <code>key[i]</code>:</p>\n\n<ol>\n\t<li>You can rotate the ring clockwise or anticlockwise by one place, which counts as <strong>one step</strong>. The final purpose of the rotation is to align one of <code>ring</code>\'s characters at the <code>"12:00"</code> direction, where this character must equal <code>key[i]</code>.</li>\n\t<li>If the character <code>key[i]</code> has been aligned at the <code>"12:00"</code> direction, press the center button to spell, which also counts as <strong>one step</strong>. After the pressing, you could begin to spell the next character in the key (next stage). Otherwise, you have finished all the spelling.</li>\n</ol>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img src="https://assets.leetcode.com/uploads/2018/10/22/ring.jpg" style="width: 450px; height: 450px;">\n<pre><strong>Input:</strong> ring = "godding", key = "gd"\n<strong>Output:</strong> 4\n<strong>Explanation:</strong>\nFor the first key character \'g\', since it is already in place, we just need 1 step to spell this character. \nFor the second key character \'d\', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".\nAlso, we need 1 more step for spelling.\nSo the final output is 4.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> ring = "godding", key = "godding"\n<strong>Output:</strong> 13\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= ring.length, key.length &lt;= 100</code></li>\n\t<li><code>ring</code> and <code>key</code> consist of only lower case English letters.</li>\n\t<li>It is guaranteed that <code>key</code> could always be spelled by rotating <code>ring</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/freedom-trail',
    solution_link: 'https://leetcode.com/problems/freedom-trail/solutions',
  },
  {
    id: 115,
    title: 'Find Largest Value in Each Tree Row',
    difficulty: 'Medium',
    categories: ['Tree', 'Depth-First Search', '2+'],
    description:
      '<p>Given the <code>root</code> of a binary tree, return <em>an array of the largest value in each row</em> of the tree <strong>(0-indexed)</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/08/21/largest_e1.jpg" style="width: 300px; height: 172px;">\n<pre><strong>Input:</strong> root = [1,3,2,5,3,null,9]\n<strong>Output:</strong> [1,3,9]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> root = [1,2,3]\n<strong>Output:</strong> [1,3]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree will be in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/find-largest-value-in-each-tree-row',
    solution_link:
      'https://leetcode.com/problems/find-largest-value-in-each-tree-row/solutions',
  },
  {
    id: 116,
    title: 'Longest Palindromic Subsequence',
    difficulty: 'Medium',
    categories: ['String', 'Dynamic Programming'],
    description:
      '<p>Given a string <code>s</code>, find <em>the longest palindromic <strong>subsequence</strong>\'s length in</em> <code>s</code>.</p>\n\n<p>A <strong>subsequence</strong> is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "bbbab"\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> One possible longest palindromic subsequence is "bbbb".\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "cbbd"\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> One possible longest palindromic subsequence is "bb".\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> consists only of lowercase English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/longest-palindromic-subsequence',
    solution_link:
      'https://leetcode.com/problems/longest-palindromic-subsequence/solutions',
  },
  {
    id: 117,
    title: 'Super Washing Machines',
    difficulty: 'Hard',
    categories: ['Array', 'Greedy'],
    description:
      '<p>You have <code>n</code> super washing machines on a line. Initially, each washing machine has some dresses or is empty.</p>\n\n<p>For each move, you could choose any <code>m</code> (<code>1 &lt;= m &lt;= n</code>) washing machines, and pass one dress of each washing machine to one of its adjacent washing machines at the same time.</p>\n\n<p>Given an integer array <code>machines</code> representing the number of dresses in each washing machine from left to right on the line, return <em>the minimum number of moves to make all the washing machines have the same number of dresses</em>. If it is not possible to do it, return <code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> machines = [1,0,5]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>\n1st move:    1     0 &lt;-- 5    =&gt;    1     1     4\n2nd move:    1 &lt;-- 1 &lt;-- 4    =&gt;    2     1     3\n3rd move:    2     1 &lt;-- 3    =&gt;    2     2     2\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> machines = [0,3,0]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong>\n1st move:    0 &lt;-- 3     0    =&gt;    1     2     0\n2nd move:    1     2 --&gt; 0    =&gt;    1     1     1\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> machines = [0,2,0]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong>\nIt\'s impossible to make all three washing machines have the same number of dresses.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == machines.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= machines[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/super-washing-machines',
    solution_link:
      'https://leetcode.com/problems/super-washing-machines/solutions',
  },
  {
    id: 118,
    title: 'Coin Change II',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming'],
    description:
      '<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p>\n\n<p>Return <em>the number of combinations that make up that amount</em>. If that amount of money cannot be made up by any combination of the coins, return <code>0</code>.</p>\n\n<p>You may assume that you have an infinite number of each kind of coin.</p>\n\n<p>The answer is <strong>guaranteed</strong> to fit into a signed <strong>32-bit</strong> integer.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> amount = 5, coins = [1,2,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> there are four ways to make up the amount:\n5=5\n5=2+2+1\n5=2+1+1+1\n5=1+1+1+1+1\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> amount = 3, coins = [2]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> the amount of 3 cannot be made up just with coins of 2.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> amount = 10, coins = [10]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= coins.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= coins[i] &lt;= 5000</code></li>\n\t<li>All the values of <code>coins</code> are <strong>unique</strong>.</li>\n\t<li><code>0 &lt;= amount &lt;= 5000</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/coin-change-ii',
    solution_link: 'https://leetcode.com/problems/coin-change-ii/solutions',
  },
  {
    id: 119,
    title: 'Random Flip Matrix',
    difficulty: 'Medium',
    categories: ['Hash Table', 'Math', 'Reservoir Sampling', '1+'],
    description:
      '<p>There is an <code>m x n</code> binary grid <code>matrix</code> with all the values set <code>0</code> initially. Design an algorithm to randomly pick an index <code>(i, j)</code> where <code>matrix[i][j] == 0</code> and flips it to <code>1</code>. All the indices <code>(i, j)</code> where <code>matrix[i][j] == 0</code> should be equally likely to be returned.</p>\n\n<p>Optimize your algorithm to minimize the number of calls made to the <strong>built-in</strong> random function of your language and optimize the time and space complexity.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution(int m, int n)</code> Initializes the object with the size of the binary matrix <code>m</code> and <code>n</code>.</li>\n\t<li><code>int[] flip()</code> Returns a random index <code>[i, j]</code> of the matrix where <code>matrix[i][j] == 0</code> and flips it to <code>1</code>.</li>\n\t<li><code>void reset()</code> Resets all the values of the matrix to be <code>0</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input</strong>\n["Solution", "flip", "flip", "flip", "reset", "flip"]\n[[3, 1], [], [], [], [], []]\n<strong>Output</strong>\n[null, [1, 0], [2, 0], [0, 0], null, [2, 0]]\n\n<strong>Explanation</strong>\nSolution solution = new Solution(3, 1);\nsolution.flip();  // return [1, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.\nsolution.flip();  // return [2, 0], Since [1,0] was returned, [2,0] and [0,0]\nsolution.flip();  // return [0, 0], Based on the previously returned indices, only [0,0] can be returned.\nsolution.reset(); // All the values are reset to 0 and can be returned.\nsolution.flip();  // return [2, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>\n\t<li>There will be at least one free cell for each call to <code>flip</code>.</li>\n\t<li>At most <code>1000</code> calls will be made to <code>flip</code> and <code>reset</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/random-flip-matrix',
    solution_link: 'https://leetcode.com/problems/random-flip-matrix/solutions',
  },
  {
    id: 120,
    title: 'Detect Capital',
    difficulty: 'Easy',
    categories: ['String'],
    description:
      '<p>We define the usage of capitals in a word to be right when one of the following cases holds:</p>\n\n<ul>\n\t<li>All letters in this word are capitals, like <code>"USA"</code>.</li>\n\t<li>All letters in this word are not capitals, like <code>"leetcode"</code>.</li>\n\t<li>Only the first letter in this word is capital, like <code>"Google"</code>.</li>\n</ul>\n\n<p>Given a string <code>word</code>, return <code>true</code> if the usage of capitals in it is right.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> word = "USA"\n<strong>Output:</strong> true\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> word = "FlaG"\n<strong>Output:</strong> false\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word.length &lt;= 100</code></li>\n\t<li><code>word</code> consists of lowercase and uppercase English letters.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/detect-capital',
    solution_link: 'https://leetcode.com/problems/detect-capital/solutions',
  },
  {
    id: 121,
    title: 'Longest Uncommon Subsequence I',
    difficulty: 'Easy',
    categories: ['String'],
    description:
      '<p>Given two strings <code>a</code> and <code>b</code>, return <em>the length of the <strong>longest uncommon subsequence</strong> between </em><code>a</code> <em>and</em> <code>b</code>. If the longest uncommon subsequence does not exist, return <code>-1</code>.</p>\n\n<p>An <strong>uncommon subsequence</strong> between two strings is a string that is a <strong>subsequence of one but not the other</strong>.</p>\n\n<p>A <strong>subsequence</strong> of a string <code>s</code> is a string that can be obtained after deleting any number of characters from <code>s</code>.</p>\n\n<ul>\n\t<li>For example, <code>"abc"</code> is a subsequence of <code>"aebdc"</code> because you can delete the underlined characters in <code>"a<u>e</u>b<u>d</u>c"</code> to get <code>"abc"</code>. Other subsequences of <code>"aebdc"</code> include <code>"aebdc"</code>, <code>"aeb"</code>, and <code>""</code> (empty string).</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> a = "aba", b = "cdc"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> One longest uncommon subsequence is "aba" because "aba" is a subsequence of "aba" but not "cdc".\nNote that "cdc" is also a longest uncommon subsequence.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> a = "aaa", b = "bbb"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>&nbsp;The longest uncommon subsequences are "aaa" and "bbb".\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> a = "aaa", b = "aaa"\n<strong>Output:</strong> -1\n<strong>Explanation:</strong>&nbsp;Every subsequence of string a is also a subsequence of string b. Similarly, every subsequence of string b is also a subsequence of string a.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= a.length, b.length &lt;= 100</code></li>\n\t<li><code>a</code> and <code>b</code> consist of lower-case English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/longest-uncommon-subsequence-i',
    solution_link:
      'https://leetcode.com/problems/longest-uncommon-subsequence-i/solutions',
  },
  {
    id: 122,
    title: 'Longest Uncommon Subsequence II',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Two Pointers', '2+'],
    description:
      '<p>Given an array of strings <code>strs</code>, return <em>the length of the <strong>longest uncommon subsequence</strong> between them</em>. If the longest uncommon subsequence does not exist, return <code>-1</code>.</p>\n\n<p>An <strong>uncommon subsequence</strong> between an array of strings is a string that is a <strong>subsequence of one string but not the others</strong>.</p>\n\n<p>A <strong>subsequence</strong> of a string <code>s</code> is a string that can be obtained after deleting any number of characters from <code>s</code>.</p>\n\n<ul>\n\t<li>For example, <code>"abc"</code> is a subsequence of <code>"aebdc"</code> because you can delete the underlined characters in <code>"a<u>e</u>b<u>d</u>c"</code> to get <code>"abc"</code>. Other subsequences of <code>"aebdc"</code> include <code>"aebdc"</code>, <code>"aeb"</code>, and <code>""</code> (empty string).</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> strs = ["aba","cdc","eae"]\n<strong>Output:</strong> 3\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> strs = ["aaa","aaa","aa"]\n<strong>Output:</strong> -1\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= strs.length &lt;= 50</code></li>\n\t<li><code>1 &lt;= strs[i].length &lt;= 10</code></li>\n\t<li><code>strs[i]</code> consists of lowercase English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/longest-uncommon-subsequence-ii',
    solution_link:
      'https://leetcode.com/problems/longest-uncommon-subsequence-ii/solutions',
  },
  {
    id: 123,
    title: 'Continuous Subarray Sum',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Math', '1+'],
    description:
      '<p>Given an integer array nums and an integer k, return <code>true</code> <em>if </em><code>nums</code><em> has a <strong>good subarray</strong> or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>A <strong>good subarray</strong> is a subarray where:</p>\n\n<ul>\n\t<li>its length is <strong>at least two</strong>, and</li>\n\t<li>the sum of the elements of the subarray is a multiple of <code>k</code>.</li>\n</ul>\n\n<p><strong>Note</strong> that:</p>\n\n<ul>\n\t<li>A <strong>subarray</strong> is a contiguous part of the array.</li>\n\t<li>An integer <code>x</code> is a multiple of <code>k</code> if there exists an integer <code>n</code> such that <code>x = n * k</code>. <code>0</code> is <strong>always</strong> a multiple of <code>k</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [23,<u>2,4</u>,6,7], k = 6\n<strong>Output:</strong> true\n<strong>Explanation:</strong> [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [<u>23,2,6,4,7</u>], k = 6\n<strong>Output:</strong> true\n<strong>Explanation:</strong> [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.\n42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [23,2,6,4,7], k = 13\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>0 &lt;= sum(nums[i]) &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>1 &lt;= k &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/continuous-subarray-sum',
    solution_link:
      'https://leetcode.com/problems/continuous-subarray-sum/solutions',
  },
  {
    id: 124,
    title: 'Longest Word in Dictionary through Deleting',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'String', '1+'],
    description:
      '<p>Given a string <code>s</code> and a string array <code>dictionary</code>, return <em>the longest string in the dictionary that can be formed by deleting some of the given string characters</em>. If there is more than one possible result, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]\n<strong>Output:</strong> "apple"\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = "abpcplea", dictionary = ["a","b","c"]\n<strong>Output:</strong> "a"\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= dictionary.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= dictionary[i].length &lt;= 1000</code></li>\n\t<li><code>s</code> and <code>dictionary[i]</code> consist of lowercase English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/longest-word-in-dictionary-through-deleting',
    solution_link:
      'https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/solutions',
  },
  {
    id: 125,
    title: 'Contiguous Array',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Prefix Sum'],
    description:
      '<p>Given a binary array <code>nums</code>, return <em>the maximum length of a contiguous subarray with an equal number of </em><code>0</code><em> and </em><code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,1,0]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums[i]</code> is either <code>0</code> or <code>1</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/contiguous-array',
    solution_link: 'https://leetcode.com/problems/contiguous-array/solutions',
  },
  {
    id: 126,
    title: 'Beautiful Arrangement',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming', '3+'],
    description:
      '<p>Suppose you have <code>n</code> integers labeled <code>1</code> through <code>n</code>. A permutation of those <code>n</code> integers <code>perm</code> (<strong>1-indexed</strong>) is considered a <strong>beautiful arrangement</strong> if for every <code>i</code> (<code>1 &lt;= i &lt;= n</code>), <strong>either</strong> of the following is true:</p>\n\n<ul>\n\t<li><code>perm[i]</code> is divisible by <code>i</code>.</li>\n\t<li><code>i</code> is divisible by <code>perm[i]</code>.</li>\n</ul>\n\n<p>Given an integer <code>n</code>, return <em>the <strong>number</strong> of the <strong>beautiful arrangements</strong> that you can construct</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = 2\n<strong>Output:</strong> 2\n<b>Explanation:</b> \nThe first beautiful arrangement is [1,2]:\n    - perm[1] = 1 is divisible by i = 1\n    - perm[2] = 2 is divisible by i = 2\nThe second beautiful arrangement is [2,1]:\n    - perm[1] = 2 is divisible by i = 1\n    - i = 2 is divisible by perm[2] = 1\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 15</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/beautiful-arrangement',
    solution_link:
      'https://leetcode.com/problems/beautiful-arrangement/solutions',
  },
  {
    id: 128,
    title: 'Random Pick with Weight',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'Binary Search', '2+'],
    description:
      '<p>You are given a <strong>0-indexed</strong> array of positive integers <code>w</code> where <code>w[i]</code> describes the <strong>weight</strong> of the <code>i<sup>th</sup></code> index.</p>\n\n<p>You need to implement the function <code>pickIndex()</code>, which <strong>randomly</strong> picks an index in the range <code>[0, w.length - 1]</code> (<strong>inclusive</strong>) and returns it. The <strong>probability</strong> of picking an index <code>i</code> is <code>w[i] / sum(w)</code>.</p>\n\n<ul>\n\t<li>For example, if <code>w = [1, 3]</code>, the probability of picking index <code>0</code> is <code>1 / (1 + 3) = 0.25</code> (i.e., <code>25%</code>), and the probability of picking index <code>1</code> is <code>3 / (1 + 3) = 0.75</code> (i.e., <code>75%</code>).</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input</strong>\n["Solution","pickIndex"]\n[[[1]],[]]\n<strong>Output</strong>\n[null,0]\n\n<strong>Explanation</strong>\nSolution solution = new Solution([1]);\nsolution.pickIndex(); // return 0. The only option is to return 0 since there is only one element in w.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input</strong>\n["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]\n[[[1,3]],[],[],[],[],[]]\n<strong>Output</strong>\n[null,1,1,1,1,0]\n\n<strong>Explanation</strong>\nSolution solution = new Solution([1, 3]);\nsolution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4.\nsolution.pickIndex(); // return 1\nsolution.pickIndex(); // return 1\nsolution.pickIndex(); // return 1\nsolution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4.\n\nSince this is a randomization problem, multiple answers are allowed.\nAll of the following outputs can be considered correct:\n[null,1,1,1,1,0]\n[null,1,1,1,1,1]\n[null,1,1,1,0,0]\n[null,1,1,1,0,1]\n[null,1,0,1,0,0]\n......\nand so on.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= w.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= w[i] &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pickIndex</code> will be called at most <code>10<sup>4</sup></code> times.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/random-pick-with-weight',
    solution_link:
      'https://leetcode.com/problems/random-pick-with-weight/solutions',
  },
  {
    id: 129,
    title: 'Minesweeper',
    difficulty: 'Medium',
    categories: ['Array', 'Depth-First Search', '2+'],
    description:
      '<p>Let\'s play the minesweeper game (<a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)" target="_blank">Wikipedia</a>, <a href="http://minesweeperonline.com" target="_blank">online game</a>)!</p>\n\n<p>You are given an <code>m x n</code> char matrix <code>board</code> representing the game board where:</p>\n\n<ul>\n\t<li><code>\'M\'</code> represents an unrevealed mine,</li>\n\t<li><code>\'E\'</code> represents an unrevealed empty square,</li>\n\t<li><code>\'B\'</code> represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),</li>\n\t<li>digit (<code>\'1\'</code> to <code>\'8\'</code>) represents how many mines are adjacent to this revealed square, and</li>\n\t<li><code>\'X\'</code> represents a revealed mine.</li>\n</ul>\n\n<p>You are also given an integer array <code>click</code> where <code>click = [click<sub>r</sub>, click<sub>c</sub>]</code> represents the next click position among all the unrevealed squares (<code>\'M\'</code> or <code>\'E\'</code>).</p>\n\n<p>Return <em>the board after revealing this position according to the following rules</em>:</p>\n\n<ol>\n\t<li>If a mine <code>\'M\'</code> is revealed, then the game is over. You should change it to <code>\'X\'</code>.</li>\n\t<li>If an empty square <code>\'E\'</code> with no adjacent mines is revealed, then change it to a revealed blank <code>\'B\'</code> and all of its adjacent unrevealed squares should be revealed recursively.</li>\n\t<li>If an empty square <code>\'E\'</code> with at least one adjacent mine is revealed, then change it to a digit (<code>\'1\'</code> to <code>\'8\'</code>) representing the number of adjacent mines.</li>\n\t<li>Return the board when no more squares will be revealed.</li>\n</ol>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img src="https://assets.leetcode.com/uploads/2023/08/09/untitled.jpeg" style="width: 500px; max-width: 400px; height: 269px;">\n<pre><strong>Input:</strong> board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]\n<strong>Output:</strong> [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img src="https://assets.leetcode.com/uploads/2023/08/09/untitled-2.jpeg" style="width: 489px; max-width: 400px; height: 269px;">\n<pre><strong>Input:</strong> board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]\n<strong>Output:</strong> [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n == board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 50</code></li>\n\t<li><code>board[i][j]</code> is either <code>\'M\'</code>, <code>\'E\'</code>, <code>\'B\'</code>, or a digit from <code>\'1\'</code> to <code>\'8\'</code>.</li>\n\t<li><code>click.length == 2</code></li>\n\t<li><code>0 &lt;= click<sub>r</sub> &lt; m</code></li>\n\t<li><code>0 &lt;= click<sub>c</sub> &lt; n</code></li>\n\t<li><code>board[click<sub>r</sub>][click<sub>c</sub>]</code> is either <code>\'M\'</code> or <code>\'E\'</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/minesweeper',
    solution_link: 'https://leetcode.com/problems/minesweeper/solutions',
  },
  {
    id: 130,
    title: 'Minimum Absolute Difference in BST',
    difficulty: 'Easy',
    categories: ['Tree', 'Depth-First Search', '3+'],
    description:
      '<p>Given the <code>root</code> of a Binary Search Tree (BST), return <em>the minimum absolute difference between the values of any two different nodes in the tree</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/02/05/bst1.jpg" style="width: 292px; height: 301px;">\n<pre><strong>Input:</strong> root = [4,2,6,1,3]\n<strong>Output:</strong> 1\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/02/05/bst2.jpg" style="width: 282px; height: 301px;">\n<pre><strong>Input:</strong> root = [1,0,48,null,null,12,49]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[2, 10<sup>4</sup>]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as 783: <a href="https://leetcode.com/problems/minimum-distance-between-bst-nodes/" target="_blank">https://leetcode.com/problems/minimum-distance-between-bst-nodes/</a></p>\n',
    question_link:
      'https://leetcode.com/problems/minimum-absolute-difference-in-bst',
    solution_link:
      'https://leetcode.com/problems/minimum-absolute-difference-in-bst/solutions',
  },
  {
    id: 132,
    title: 'K-diff Pairs in an Array',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Two Pointers', '2+'],
    description:
      '<p>Given an array of integers <code>nums</code> and an integer <code>k</code>, return <em>the number of <b>unique</b> k-diff pairs in the array</em>.</p>\n\n<p>A <strong>k-diff</strong> pair is an integer pair <code>(nums[i], nums[j])</code>, where the following are true:</p>\n\n<ul>\n\t<li><code>0 &lt;= i, j &lt; nums.length</code></li>\n\t<li><code>i != j</code></li>\n\t<li><code>|nums[i] - nums[j]| == k</code></li>\n</ul>\n\n<p><strong>Notice</strong> that <code>|val|</code> denotes the absolute value of <code>val</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [3,1,4,1,5], k = 2\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There are two 2-diff pairs in the array, (1, 3) and (3, 5).\nAlthough we have two 1s in the input, we should only return the number of <strong>unique</strong> pairs.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3,4,5], k = 1\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,3,1,5,4], k = 0\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> There is one 0-diff pair in the array, (1, 1).\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>7</sup> &lt;= nums[i] &lt;= 10<sup>7</sup></code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>7</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/k-diff-pairs-in-an-array',
    solution_link:
      'https://leetcode.com/problems/k-diff-pairs-in-an-array/solutions',
  },
  {
    id: 135,
    title: 'Encode and Decode TinyURL',
    difficulty: 'Medium',
    categories: ['Hash Table', 'String', 'Design', '1+'],
    description:
      '<blockquote>Note: This is a companion problem to the <a href="https://leetcode.com/discuss/interview-question/system-design/" target="_blank">System Design</a> problem: <a href="https://leetcode.com/discuss/interview-question/124658/Design-a-URL-Shortener-(-TinyURL-)-System/" target="_blank">Design TinyURL</a>.</blockquote>\n\n<p>TinyURL is a URL shortening service where you enter a URL such as <code>https://leetcode.com/problems/design-tinyurl</code> and it returns a short URL such as <code>http://tinyurl.com/4e9iAk</code>. Design a class to encode a URL and decode a tiny URL.</p>\n\n<p>There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.</p>\n\n<p>Implement the <code>Solution</code> class:</p>\n\n<ul>\n\t<li><code>Solution()</code> Initializes the object of the system.</li>\n\t<li><code>String encode(String longUrl)</code> Returns a tiny URL for the given <code>longUrl</code>.</li>\n\t<li><code>String decode(String shortUrl)</code> Returns the original long URL for the given <code>shortUrl</code>. It is guaranteed that the given <code>shortUrl</code> was encoded by the same object.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> url = "https://leetcode.com/problems/design-tinyurl"\n<strong>Output:</strong> "https://leetcode.com/problems/design-tinyurl"\n\n<strong>Explanation:</strong>\nSolution obj = new Solution();\nstring tiny = obj.encode(url); // returns the encoded tiny url.\nstring ans = obj.decode(tiny); // returns the original url after decoding it.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= url.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>url</code> is guranteed to be a valid URL.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/encode-and-decode-tinyurl',
    solution_link:
      'https://leetcode.com/problems/encode-and-decode-tinyurl/solutions',
  },
  {
    id: 137,
    title: 'Complex Number Multiplication',
    difficulty: 'Medium',
    categories: ['Math', 'String', 'Simulation'],
    description:
      '<p>A <a href="https://en.wikipedia.org/wiki/Complex_number" target="_blank">complex number</a> can be represented as a string on the form <code>"<strong>real</strong>+<strong>imaginary</strong>i"</code> where:</p>\n\n<ul>\n\t<li><code>real</code> is the real part and is an integer in the range <code>[-100, 100]</code>.</li>\n\t<li><code>imaginary</code> is the imaginary part and is an integer in the range <code>[-100, 100]</code>.</li>\n\t<li><code>i<sup>2</sup> == -1</code>.</li>\n</ul>\n\n<p>Given two complex numbers <code>num1</code> and <code>num2</code> as strings, return <em>a string of the complex number that represents their multiplications</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> num1 = "1+1i", num2 = "1+1i"\n<strong>Output:</strong> "0+2i"\n<strong>Explanation:</strong> (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> num1 = "1+-1i", num2 = "1+-1i"\n<strong>Output:</strong> "0+-2i"\n<strong>Explanation:</strong> (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>num1</code> and <code>num2</code> are valid complex numbers.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/complex-number-multiplication',
    solution_link:
      'https://leetcode.com/problems/complex-number-multiplication/solutions',
  },
  {
    id: 138,
    title: 'Convert BST to Greater Tree',
    difficulty: 'Medium',
    categories: ['Tree', 'Depth-First Search', '2+'],
    description:
      '<p>Given the <code>root</code> of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.</p>\n\n<p>As a reminder, a <em>binary search tree</em> is a tree that satisfies these constraints:</p>\n\n<ul>\n\t<li>The left subtree of a node contains only nodes with keys <strong>less than</strong> the node\'s key.</li>\n\t<li>The right subtree of a node contains only nodes with keys <strong>greater than</strong> the node\'s key.</li>\n\t<li>Both the left and right subtrees must also be binary search trees.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2019/05/02/tree.png" style="width: 500px; height: 341px;">\n<pre><strong>Input:</strong> root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]\n<strong>Output:</strong> [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> root = [0,null,1]\n<strong>Output:</strong> [1,null,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li>All the values in the tree are <strong>unique</strong>.</li>\n\t<li><code>root</code> is guaranteed to be a valid binary search tree.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Note:</strong> This question is the same as 1038: <a href="https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/" target="_blank">https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/</a></p>\n',
    question_link: 'https://leetcode.com/problems/convert-bst-to-greater-tree',
    solution_link:
      'https://leetcode.com/problems/convert-bst-to-greater-tree/solutions',
  },
  {
    id: 139,
    title: 'Minimum Time Difference',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'String', '1+'],
    description:
      'Given a list of 24-hour clock time points in <strong>"HH:MM"</strong> format, return <em>the minimum <b>minutes</b> difference between any two time-points in the list</em>.\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> timePoints = ["23:59","00:00"]\n<strong>Output:</strong> 1\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> timePoints = ["00:00","23:59","00:00"]\n<strong>Output:</strong> 0\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= timePoints.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>timePoints[i]</code> is in the format <strong>"HH:MM"</strong>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/minimum-time-difference',
    solution_link:
      'https://leetcode.com/problems/minimum-time-difference/solutions',
  },
  {
    id: 140,
    title: 'Single Element in a Sorted Array',
    difficulty: 'Medium',
    categories: ['Array', 'Binary Search'],
    description:
      '<p>You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.</p>\n\n<p>Return <em>the single element that appears only once</em>.</p>\n\n<p>Your solution must run in <code>O(log n)</code> time and <code>O(1)</code> space.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,1,2,3,3,4,4,8,8]\n<strong>Output:</strong> 2\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [3,3,7,7,10,11,11]\n<strong>Output:</strong> 10\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/single-element-in-a-sorted-array',
    solution_link:
      'https://leetcode.com/problems/single-element-in-a-sorted-array/solutions',
  },
  {
    id: 141,
    title: 'Reverse String II',
    difficulty: 'Easy',
    categories: ['Two Pointers', 'String'],
    description:
      '<p>Given a string <code>s</code> and an integer <code>k</code>, reverse the first <code>k</code> characters for every <code>2k</code> characters counting from the start of the string.</p>\n\n<p>If there are fewer than <code>k</code> characters left, reverse all of them. If there are less than <code>2k</code> but greater than or equal to <code>k</code> characters, then reverse the first <code>k</code> characters and leave the other as original.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = "abcdefg", k = 2\n<strong>Output:</strong> "bacdfeg"\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = "abcd", k = 2\n<strong>Output:</strong> "bacd"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> consists of only lowercase English letters.</li>\n\t<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/reverse-string-ii',
    solution_link: 'https://leetcode.com/problems/reverse-string-ii/solutions',
  },
  {
    id: 142,
    title: '01 Matrix',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming', '2+'],
    description:
      '<p>Given an <code>m x n</code> binary matrix <code>mat</code>, return <em>the distance of the nearest </em><code>0</code><em> for each cell</em>.</p>\n\n<p>The distance between two adjacent cells is <code>1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/01-1-grid.jpg" style="width: 253px; height: 253px;">\n<pre><strong>Input:</strong> mat = [[0,0,0],[0,1,0],[0,0,0]]\n<strong>Output:</strong> [[0,0,0],[0,1,0],[0,0,0]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/01-2-grid.jpg" style="width: 253px; height: 253px;">\n<pre><strong>Input:</strong> mat = [[0,0,0],[0,1,0],[1,1,1]]\n<strong>Output:</strong> [[0,0,0],[0,1,0],[1,2,1]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == mat.length</code></li>\n\t<li><code>n == mat[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>mat[i][j]</code> is either <code>0</code> or <code>1</code>.</li>\n\t<li>There is at least one <code>0</code> in <code>mat</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/01-matrix',
    solution_link: 'https://leetcode.com/problems/01-matrix/solutions',
  },
  {
    id: 143,
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    categories: ['Tree', 'Depth-First Search', 'Binary Tree'],
    description:
      '<p>Given the <code>root</code> of a binary tree, return <em>the length of the <strong>diameter</strong> of the tree</em>.</p>\n\n<p>The <strong>diameter</strong> of a binary tree is the <strong>length</strong> of the longest path between any two nodes in a tree. This path may or may not pass through the <code>root</code>.</p>\n\n<p>The <strong>length</strong> of a path between two nodes is represented by the number of edges between them.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg" style="width: 292px; height: 302px;">\n<pre><strong>Input:</strong> root = [1,2,3,4,5]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 3 is the length of the path [4,2,1,3] or [5,2,1,3].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> root = [1,2]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/diameter-of-binary-tree',
    solution_link:
      'https://leetcode.com/problems/diameter-of-binary-tree/solutions',
  },
  {
    id: 146,
    title: 'Remove Boxes',
    difficulty: 'Hard',
    categories: ['Array', 'Dynamic Programming', 'Memoization'],
    description:
      '<p>You are given several <code>boxes</code> with different colors represented by different positive numbers.</p>\n\n<p>You may experience several rounds to remove boxes until there is no box left. Each time you can choose some continuous boxes with the same color (i.e., composed of <code>k</code> boxes, <code>k &gt;= 1</code>), remove them and get <code>k * k</code> points.</p>\n\n<p>Return <em>the maximum points you can get</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> boxes = [1,3,2,2,2,3,4,3,1]\n<strong>Output:</strong> 23\n<strong>Explanation:</strong>\n[1, 3, 2, 2, 2, 3, 4, 3, 1] \n----&gt; [1, 3, 3, 4, 3, 1] (3*3=9 points) \n----&gt; [1, 3, 3, 3, 1] (1*1=1 points) \n----&gt; [1, 1] (3*3=9 points) \n----&gt; [] (2*2=4 points)\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> boxes = [1,1,1]\n<strong>Output:</strong> 9\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> boxes = [1]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= boxes.length &lt;= 100</code></li>\n\t<li><code>1 &lt;= boxes[i]&nbsp;&lt;= 100</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/remove-boxes',
    solution_link: 'https://leetcode.com/problems/remove-boxes/solutions',
  },
  {
    id: 147,
    title: 'Number of Provinces',
    difficulty: 'Medium',
    categories: ['Depth-First Search', 'Breadth-First Search', '2+'],
    description:
      '<p>There are <code>n</code> cities. Some of them are connected, while some are not. If city <code>a</code> is connected directly with city <code>b</code>, and city <code>b</code> is connected directly with city <code>c</code>, then city <code>a</code> is connected indirectly with city <code>c</code>.</p>\n\n<p>A <strong>province</strong> is a group of directly or indirectly connected cities and no other cities outside of the group.</p>\n\n<p>You are given an <code>n x n</code> matrix <code>isConnected</code> where <code>isConnected[i][j] = 1</code> if the <code>i<sup>th</sup></code> city and the <code>j<sup>th</sup></code> city are directly connected, and <code>isConnected[i][j] = 0</code> otherwise.</p>\n\n<p>Return <em>the total number of <strong>provinces</strong></em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph1.jpg" style="width: 222px; height: 142px;">\n<pre><strong>Input:</strong> isConnected = [[1,1,0],[1,1,0],[0,0,1]]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph2.jpg" style="width: 222px; height: 142px;">\n<pre><strong>Input:</strong> isConnected = [[1,0,0],[0,1,0],[0,0,1]]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 200</code></li>\n\t<li><code>n == isConnected.length</code></li>\n\t<li><code>n == isConnected[i].length</code></li>\n\t<li><code>isConnected[i][j]</code> is <code>1</code> or <code>0</code>.</li>\n\t<li><code>isConnected[i][i] == 1</code></li>\n\t<li><code>isConnected[i][j] == isConnected[j][i]</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/number-of-provinces',
    solution_link:
      'https://leetcode.com/problems/number-of-provinces/solutions',
  },
  {
    id: 149,
    title: 'Binary Tree Longest Consecutive Sequence II',
    difficulty: 'Medium',
    categories: ['Tree', 'Depth-First Search', 'Binary Tree'],
    description: '',
    question_link:
      'https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii',
    solution_link:
      'https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii/solutions',
  },
  {
    id: 150,
    title: 'Game Play Analysis IV',
    difficulty: 'Medium',
    categories: ['Database'],
    description:
      '<p>Table: <code>Activity</code></p>\n\n<pre>+--------------+---------+\n| Column Name  | Type    |\n+--------------+---------+\n| player_id    | int     |\n| device_id    | int     |\n| event_date   | date    |\n| games_played | int     |\n+--------------+---------+\n(player_id, event_date) is the primary key (combination of columns with unique values) of this table.\nThis table shows the activity of players of some games.\nEach row is a record of a player who logged in and played a number of games (possibly 0) before logging out on someday using some device.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a&nbsp;solution&nbsp;to report the <strong>fraction</strong> of players that logged in again on the day after the day they first logged in, <strong>rounded to 2 decimal places</strong>. In other words, you need to count the number of players that logged in for at least two consecutive days starting from their first login date, then divide that number by the total number of players.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nActivity table:\n+-----------+-----------+------------+--------------+\n| player_id | device_id | event_date | games_played |\n+-----------+-----------+------------+--------------+\n| 1         | 2         | 2016-03-01 | 5            |\n| 1         | 2         | 2016-03-02 | 6            |\n| 2         | 3         | 2017-06-25 | 1            |\n| 3         | 1         | 2016-03-02 | 0            |\n| 3         | 4         | 2018-07-03 | 5            |\n+-----------+-----------+------------+--------------+\n<strong>Output:</strong> \n+-----------+\n| fraction  |\n+-----------+\n| 0.33      |\n+-----------+\n<strong>Explanation:</strong> \nOnly the player with id 1 logged back in after the first day he had logged in so the answer is 1/3 = 0.33\n</pre>\n',
    question_link: 'https://leetcode.com/problems/game-play-analysis-iv',
    solution_link:
      'https://leetcode.com/problems/game-play-analysis-iv/solutions',
  },
  {
    id: 151,
    title: 'Student Attendance Record I',
    difficulty: 'Easy',
    categories: ['String'],
    description:
      "<p>You are given a string <code>s</code> representing an attendance record for a student where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:</p>\n\n<ul>\n\t<li><code>'A'</code>: Absent.</li>\n\t<li><code>'L'</code>: Late.</li>\n\t<li><code>'P'</code>: Present.</li>\n</ul>\n\n<p>The student is eligible for an attendance award if they meet <strong>both</strong> of the following criteria:</p>\n\n<ul>\n\t<li>The student was absent (<code>'A'</code>) for <strong>strictly</strong> fewer than 2 days <strong>total</strong>.</li>\n\t<li>The student was <strong>never</strong> late (<code>'L'</code>) for 3 or more <strong>consecutive</strong> days.</li>\n</ul>\n\n<p>Return <code>true</code><em> if the student is eligible for an attendance award, or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s = \"PPALLP\"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The student has fewer than 2 absences and was never late 3 or more consecutive days.\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s = \"PPALLL\"\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The student was late 3 consecutive days in the last 3 days, so is not eligible for the award.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s[i]</code> is either <code>'A'</code>, <code>'L'</code>, or <code>'P'</code>.</li>\n</ul>\n",
    question_link: 'https://leetcode.com/problems/student-attendance-record-i',
    solution_link:
      'https://leetcode.com/problems/student-attendance-record-i/solutions',
  },
  {
    id: 152,
    title: 'Student Attendance Record II',
    difficulty: 'Hard',
    categories: ['Dynamic Programming'],
    description:
      '<p>An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:</p>\n\n<ul>\n\t<li><code>\'A\'</code>: Absent.</li>\n\t<li><code>\'L\'</code>: Late.</li>\n\t<li><code>\'P\'</code>: Present.</li>\n</ul>\n\n<p>Any student is eligible for an attendance award if they meet <strong>both</strong> of the following criteria:</p>\n\n<ul>\n\t<li>The student was absent (<code>\'A\'</code>) for <strong>strictly</strong> fewer than 2 days <strong>total</strong>.</li>\n\t<li>The student was <strong>never</strong> late (<code>\'L\'</code>) for 3 or more <strong>consecutive</strong> days.</li>\n</ul>\n\n<p>Given an integer <code>n</code>, return <em>the <strong>number</strong> of possible attendance records of length</em> <code>n</code><em> that make a student eligible for an attendance award. The answer may be very large, so return it <strong>modulo</strong> </em><code>10<sup>9</sup> + 7</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = 2\n<strong>Output:</strong> 8\n<strong>Explanation:</strong> There are 8 records with length 2 that are eligible for an award:\n"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"\nOnly "AA" is not eligible because there are 2 absences (there need to be fewer than 2).\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> n = 10101\n<strong>Output:</strong> 183236316\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/student-attendance-record-ii',
    solution_link:
      'https://leetcode.com/problems/student-attendance-record-ii/solutions',
  },
  {
    id: 153,
    title: 'Optimal Division',
    difficulty: 'Medium',
    categories: ['Array', 'Math', 'Dynamic Programming'],
    description:
      '<p>You are given an integer array <code>nums</code>. The adjacent integers in <code>nums</code> will perform the float division.</p>\n\n<ul>\n\t<li>For example, for <code>nums = [2,3,4]</code>, we will evaluate the expression <code>"2/3/4"</code>.</li>\n</ul>\n\n<p>However, you can add any number of parenthesis at any position to change the priority of operations. You want to add these parentheses such the value of the expression after the evaluation is maximum.</p>\n\n<p>Return <em>the corresponding expression that has the maximum value in string format</em>.</p>\n\n<p><strong>Note:</strong> your expression should not contain redundant parenthesis.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1000,100,10,2]\n<strong>Output:</strong> "1000/(100/10/2)"\n<strong>Explanation:</strong> 1000/(100/10/2) = 1000/((100/10)/2) = 200\nHowever, the bold parenthesis in "1000/(<strong>(</strong>100/10<strong>)</strong>/2)" are redundant since they do not influence the operation priority.\nSo you should return "1000/(100/10/2)".\nOther cases:\n1000/(100/10)/2 = 50\n1000/(100/(10/2)) = 50\n1000/100/10/2 = 0.5\n1000/100/(10/2) = 2\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [2,3,4]\n<strong>Output:</strong> "2/(3/4)"\n<strong>Explanation:</strong> (2/(3/4)) = 8/3 = 2.667\nIt can be shown that after trying all possibilities, we cannot get an expression with evaluation greater than 2.667\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10</code></li>\n\t<li><code>2 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li>There is only one optimal division for the given input.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/optimal-division',
    solution_link: 'https://leetcode.com/problems/optimal-division/solutions',
  },
  {
    id: 154,
    title: 'Brick Wall',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table'],
    description:
      '<p>There is a rectangular brick wall in front of you with <code>n</code> rows of bricks. The <code>i<sup>th</sup></code> row has some number of bricks each of the same height (i.e., one unit) but they can be of different widths. The total width of each row is the same.</p>\n\n<p>Draw a vertical line from the top to the bottom and cross the least bricks. If your line goes through the edge of a brick, then the brick is not considered as crossed. You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.</p>\n\n<p>Given the 2D array <code>wall</code> that contains the information about the wall, return <em>the minimum number of crossed bricks after drawing such a vertical line</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/cutwall-grid.jpg" style="width: 493px; height: 577px;">\n<pre><strong>Input:</strong> wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> wall = [[1],[1],[1]]\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == wall.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= wall[i].length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= sum(wall[i].length) &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>sum(wall[i])</code> is the same for each row <code>i</code>.</li>\n\t<li><code>1 &lt;= wall[i][j] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/brick-wall',
    solution_link: 'https://leetcode.com/problems/brick-wall/solutions',
  },
  {
    id: 156,
    title: 'Next Greater Element III',
    difficulty: 'Medium',
    categories: ['Math', 'Two Pointers', 'String'],
    description:
      '<p>Given a positive integer <code>n</code>, find <em>the smallest integer which has exactly the same digits existing in the integer</em> <code>n</code> <em>and is greater in value than</em> <code>n</code>. If no such positive integer exists, return <code>-1</code>.</p>\n\n<p><strong>Note</strong> that the returned integer should fit in <strong>32-bit integer</strong>, if there is a valid answer but it does not fit in <strong>32-bit integer</strong>, return <code>-1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> n = 12\n<strong>Output:</strong> 21\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> n = 21\n<strong>Output:</strong> -1\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/next-greater-element-iii',
    solution_link:
      'https://leetcode.com/problems/next-greater-element-iii/solutions',
  },
  {
    id: 157,
    title: 'Reverse Words in a String III',
    difficulty: 'Easy',
    categories: ['Two Pointers', 'String'],
    description:
      '<p>Given a string <code>s</code>, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = "Let\'s take LeetCode contest"\n<strong>Output:</strong> "s\'teL ekat edoCteeL tsetnoc"\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = "God Ding"\n<strong>Output:</strong> "doG gniD"\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code> contains printable <strong>ASCII</strong> characters.</li>\n\t<li><code>s</code> does not contain any leading or trailing spaces.</li>\n\t<li>There is <strong>at least one</strong> word in <code>s</code>.</li>\n\t<li>All the words in <code>s</code> are separated by a single space.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/reverse-words-in-a-string-iii',
    solution_link:
      'https://leetcode.com/problems/reverse-words-in-a-string-iii/solutions',
  },
  {
    id: 158,
    title: 'Logical OR of Two Binary Grids Represented as Quad-Trees',
    difficulty: 'Medium',
    categories: ['Divide and Conquer', 'Tree'],
    description:
      '<p>A Binary Matrix is a matrix in which all the elements are either <strong>0</strong> or <strong>1</strong>.</p>\n\n<p>Given <code>quadTree1</code> and <code>quadTree2</code>. <code>quadTree1</code> represents a <code>n * n</code> binary matrix and <code>quadTree2</code> represents another <code>n * n</code> binary matrix.</p>\n\n<p>Return <em>a Quad-Tree</em> representing the <code>n * n</code> binary matrix which is the result of <strong>logical bitwise OR</strong> of the two binary matrixes represented by <code>quadTree1</code> and <code>quadTree2</code>.</p>\n\n<p>Notice that you can assign the value of a node to <strong>True</strong> or <strong>False</strong> when <code>isLeaf</code> is <strong>False</strong>, and both are <strong>accepted</strong> in the answer.</p>\n\n<p>A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:</p>\n\n<ul>\n\t<li><code>val</code>: True if the node represents a grid of 1\'s or False if the node represents a grid of 0\'s.</li>\n\t<li><code>isLeaf</code>: True if the node is leaf node on the tree or False if the node has the four children.</li>\n</ul>\n\n<pre>class Node {\n    public boolean val;\n    public boolean isLeaf;\n    public Node topLeft;\n    public Node topRight;\n    public Node bottomLeft;\n    public Node bottomRight;\n}</pre>\n\n<p>We can construct a Quad-Tree from a two-dimensional area using the following steps:</p>\n\n<ol>\n\t<li>If the current grid has the same value (i.e all <code>1\'s</code> or all <code>0\'s</code>) set <code>isLeaf</code> True and set <code>val</code> to the value of the grid and set the four children to Null and stop.</li>\n\t<li>If the current grid has different values, set <code>isLeaf</code> to False and set <code>val</code> to any value and divide the current grid into four sub-grids as shown in the photo.</li>\n\t<li>Recurse for each of the children with the proper sub-grid.</li>\n</ol>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/02/11/new_top.png" style="width: 777px; height: 181px;">\n<p>If you want to know more about the Quad-Tree, you can refer to the <a href="https://en.wikipedia.org/wiki/Quadtree">wiki</a>.</p>\n\n<p><strong>Quad-Tree format:</strong></p>\n\n<p>The input/output represents the serialized format of a Quad-Tree using level order traversal, where <code>null</code> signifies a path terminator where no node exists below.</p>\n\n<p>It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list <code>[isLeaf, val]</code>.</p>\n\n<p>If the value of <code>isLeaf</code> or <code>val</code> is True we represent it as <strong>1</strong> in the list <code>[isLeaf, val]</code> and if the value of <code>isLeaf</code> or <code>val</code> is False we represent it as <strong>0</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/02/11/qt1.png" style="width: 550px; height: 196px;"> <img alt="" src="https://assets.leetcode.com/uploads/2020/02/11/qt2.png" style="width: 550px; height: 278px;">\n<pre><strong>Input:</strong> quadTree1 = [[0,1],[1,1],[1,1],[1,0],[1,0]]\n, quadTree2 = [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]\n<strong>Output:</strong> [[0,0],[1,1],[1,1],[1,1],[1,0]]\n<strong>Explanation:</strong> quadTree1 and quadTree2 are shown above. You can see the binary matrix which is represented by each Quad-Tree.\nIf we apply logical bitwise OR on the two binary matrices we get the binary matrix below which is represented by the result Quad-Tree.\nNotice that the binary matrices shown are only for illustration, you don\'t have to construct the binary matrix to get the result tree.\n<img alt="" src="https://assets.leetcode.com/uploads/2020/02/11/qtr.png" style="width: 777px; height: 222px;">\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> quadTree1 = [[1,0]], quadTree2 = [[1,0]]\n<strong>Output:</strong> [[1,0]]\n<strong>Explanation:</strong> Each tree represents a binary matrix of size 1*1. Each matrix contains only zero.\nThe resulting matrix is of size 1*1 with also zero.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>quadTree1</code> and <code>quadTree2</code> are both <strong>valid</strong> Quad-Trees each representing a <code>n * n</code> grid.</li>\n\t<li><code>n == 2<sup>x</sup></code> where <code>0 &lt;= x &lt;= 9</code>.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/logical-or-of-two-binary-grids-represented-as-quad-trees',
    solution_link:
      'https://leetcode.com/problems/logical-or-of-two-binary-grids-represented-as-quad-trees/solutions',
  },
  {
    id: 159,
    title: 'Maximum Depth of N-ary Tree',
    difficulty: 'Easy',
    categories: ['Tree', 'Depth-First Search', 'Breadth-First Search'],
    description:
      '<p>Given a n-ary tree, find its maximum depth.</p>\n\n<p>The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>\n\n<p><em>Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).</em></p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;"></p>\n\n<pre><strong>Input:</strong> root = [1,null,3,2,4,null,5,6]\n<strong>Output:</strong> 3\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="width: 296px; height: 241px;"></p>\n\n<pre><strong>Input:</strong> root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]\n<strong>Output:</strong> 5\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The total number of nodes is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li>The depth of the n-ary tree is less than or equal to <code>1000</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/maximum-depth-of-n-ary-tree',
    solution_link:
      'https://leetcode.com/problems/maximum-depth-of-n-ary-tree/solutions',
  },
  {
    id: 160,
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Prefix Sum'],
    description:
      '<p>Given an array of integers <code>nums</code> and an integer <code>k</code>, return <em>the total number of subarrays whose sum equals to</em> <code>k</code>.</p>\n\n<p>A subarray is a contiguous <strong>non-empty</strong> sequence of elements within an array.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<pre><strong>Input:</strong> nums = [1,1,1], k = 2\n<strong>Output:</strong> 2\n</pre><p><strong class="example">Example 2:</strong></p>\n<pre><strong>Input:</strong> nums = [1,2,3], k = 3\n<strong>Output:</strong> 2\n</pre>\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>7</sup> &lt;= k &lt;= 10<sup>7</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/subarray-sum-equals-k',
    solution_link:
      'https://leetcode.com/problems/subarray-sum-equals-k/solutions',
  },
  {
    id: 161,
    title: 'Array Partition',
    difficulty: 'Easy',
    categories: ['Array', 'Greedy', 'Sorting', '1+'],
    description:
      '<p>Given an integer array <code>nums</code> of <code>2n</code> integers, group these integers into <code>n</code> pairs <code>(a<sub>1</sub>, b<sub>1</sub>), (a<sub>2</sub>, b<sub>2</sub>), ..., (a<sub>n</sub>, b<sub>n</sub>)</code> such that the sum of <code>min(a<sub>i</sub>, b<sub>i</sub>)</code> for all <code>i</code> is <strong>maximized</strong>. Return<em> the maximized sum</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,4,3,2]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> All possible pairings (ignoring the ordering of elements) are:\n1. (1, 4), (2, 3) -&gt; min(1, 4) + min(2, 3) = 1 + 2 = 3\n2. (1, 3), (2, 4) -&gt; min(1, 3) + min(2, 4) = 1 + 2 = 3\n3. (1, 2), (3, 4) -&gt; min(1, 2) + min(3, 4) = 1 + 3 = 4\nSo the maximum possible sum is 4.</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [6,2,6,5,1,2]\n<strong>Output:</strong> 9\n<strong>Explanation:</strong> The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums.length == 2 * n</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/array-partition',
    solution_link: 'https://leetcode.com/problems/array-partition/solutions',
  },
  {
    id: 163,
    title: 'Binary Tree Tilt',
    difficulty: 'Easy',
    categories: ['Tree', 'Depth-First Search', 'Binary Tree'],
    description:
      '<p>Given the <code>root</code> of a binary tree, return <em>the sum of every tree node\'s <strong>tilt</strong>.</em></p>\n\n<p>The <strong>tilt</strong> of a tree node is the <strong>absolute difference</strong> between the sum of all left subtree node <strong>values</strong> and all right subtree node <strong>values</strong>. If a node does not have a left child, then the sum of the left subtree node <strong>values</strong> is treated as <code>0</code>. The rule is similar if the node does not have a right child.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/20/tilt1.jpg" style="width: 712px; height: 182px;">\n<pre><strong>Input:</strong> root = [1,2,3]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> \nTilt of node 2 : |0-0| = 0 (no children)\nTilt of node 3 : |0-0| = 0 (no children)\nTilt of node 1 : |2-3| = 1 (left subtree is just left child, so sum is 2; right subtree is just right child, so sum is 3)\nSum of every tilt : 0 + 0 + 1 = 1\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/20/tilt2.jpg" style="width: 800px; height: 203px;">\n<pre><strong>Input:</strong> root = [4,2,9,3,5,null,7]\n<strong>Output:</strong> 15\n<strong>Explanation:</strong> \nTilt of node 3 : |0-0| = 0 (no children)\nTilt of node 5 : |0-0| = 0 (no children)\nTilt of node 7 : |0-0| = 0 (no children)\nTilt of node 2 : |3-5| = 2 (left subtree is just left child, so sum is 3; right subtree is just right child, so sum is 5)\nTilt of node 9 : |0-7| = 7 (no left child, so sum is 0; right subtree is just right child, so sum is 7)\nTilt of node 4 : |(3+5+2)-(9+7)| = |10-16| = 6 (left subtree values are 3, 5, and 2, which sums to 10; right subtree values are 9 and 7, which sums to 16)\nSum of every tilt : 0 + 0 + 0 + 2 + 7 + 6 = 15\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/20/tilt3.jpg" style="width: 800px; height: 293px;">\n<pre><strong>Input:</strong> root = [21,7,14,1,1,2,2,3,3]\n<strong>Output:</strong> 9\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/binary-tree-tilt',
    solution_link: 'https://leetcode.com/problems/binary-tree-tilt/solutions',
  },
  {
    id: 164,
    title: 'Find the Closest Palindrome',
    difficulty: 'Hard',
    categories: ['Math', 'String'],
    description:
      '<p>Given a string <code>n</code> representing an integer, return <em>the closest integer (not including itself), which is a palindrome</em>. If there is a tie, return <em><strong>the smaller one</strong></em>.</p>\n\n<p>The closest is defined as the absolute difference minimized between two integers.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = "123"\n<strong>Output:</strong> "121"\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = "1"\n<strong>Output:</strong> "0"\n<strong>Explanation:</strong> 0 and 2 are the closest palindromes but we return the smallest which is 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n.length &lt;= 18</code></li>\n\t<li><code>n</code> consists of only digits.</li>\n\t<li><code>n</code> does not have leading zeros.</li>\n\t<li><code>n</code> is representing an integer in the range <code>[1, 10<sup>18</sup> - 1]</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/find-the-closest-palindrome',
    solution_link:
      'https://leetcode.com/problems/find-the-closest-palindrome/solutions',
  },
  {
    id: 165,
    title: 'Array Nesting',
    difficulty: 'Medium',
    categories: ['Array', 'Depth-First Search'],
    description:
      '<p>You are given an integer array <code>nums</code> of length <code>n</code> where <code>nums</code> is a permutation of the numbers in the range <code>[0, n - 1]</code>.</p>\n\n<p>You should build a set <code>s[k] = {nums[k], nums[nums[k]], nums[nums[nums[k]]], ... }</code> subjected to the following rule:</p>\n\n<ul>\n\t<li>The first element in <code>s[k]</code> starts with the selection of the element <code>nums[k]</code> of <code>index = k</code>.</li>\n\t<li>The next element in <code>s[k]</code> should be <code>nums[nums[k]]</code>, and then <code>nums[nums[nums[k]]]</code>, and so on.</li>\n\t<li>We stop adding right before a duplicate element occurs in <code>s[k]</code>.</li>\n</ul>\n\n<p>Return <em>the longest length of a set</em> <code>s[k]</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [5,4,0,3,1,6,2]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> \nnums[0] = 5, nums[1] = 4, nums[2] = 0, nums[3] = 3, nums[4] = 1, nums[5] = 6, nums[6] = 2.\nOne of the longest sets s[k]:\ns[0] = {nums[0], nums[5], nums[6], nums[2]} = {5, 6, 2, 0}\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [0,1,2]\n<strong>Output:</strong> 1\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt; nums.length</code></li>\n\t<li>All the values of <code>nums</code> are <strong>unique</strong>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/array-nesting',
    solution_link: 'https://leetcode.com/problems/array-nesting/solutions',
  },
  {
    id: 166,
    title: 'Reshape the Matrix',
    difficulty: 'Easy',
    categories: ['Array', 'Matrix', 'Simulation'],
    description:
      '<p>In MATLAB, there is a handy function called <code>reshape</code> which can reshape an <code>m x n</code> matrix into a new one with a different size <code>r x c</code> keeping its original data.</p>\n\n<p>You are given an <code>m x n</code> matrix <code>mat</code> and two integers <code>r</code> and <code>c</code> representing the number of rows and the number of columns of the wanted reshaped matrix.</p>\n\n<p>The reshaped matrix should be filled with all the elements of the original matrix in the same row-traversing order as they were.</p>\n\n<p>If the <code>reshape</code> operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/reshape1-grid.jpg" style="width: 613px; height: 173px;">\n<pre><strong>Input:</strong> mat = [[1,2],[3,4]], r = 1, c = 4\n<strong>Output:</strong> [[1,2,3,4]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/reshape2-grid.jpg" style="width: 453px; height: 173px;">\n<pre><strong>Input:</strong> mat = [[1,2],[3,4]], r = 2, c = 4\n<strong>Output:</strong> [[1,2],[3,4]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>m == mat.length</code></li>\n\t<li><code>n == mat[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>-1000 &lt;= mat[i][j] &lt;= 1000</code></li>\n\t<li><code>1 &lt;= r, c &lt;= 300</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/reshape-the-matrix',
    solution_link: 'https://leetcode.com/problems/reshape-the-matrix/solutions',
  },
  {
    id: 167,
    title: 'Permutation in String',
    difficulty: 'Medium',
    categories: ['Hash Table', 'Two Pointers', 'String', '1+'],
    description:
      '<p>Given two strings <code>s1</code> and <code>s2</code>, return <code>true</code><em> if </em><code>s2</code><em> contains a permutation of </em><code>s1</code><em>, or </em><code>false</code><em> otherwise</em>.</p>\n\n<p>In other words, return <code>true</code> if one of <code>s1</code>\'s permutations is the substring of <code>s2</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> s1 = "ab", s2 = "eidbaooo"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> s2 contains one permutation of s1 ("ba").\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> s1 = "ab", s2 = "eidboaoo"\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s1.length, s2.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s1</code> and <code>s2</code> consist of lowercase English letters.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/permutation-in-string',
    solution_link:
      'https://leetcode.com/problems/permutation-in-string/solutions',
  },
  {
    id: 168,
    title: 'Maximum Vacation Days',
    difficulty: 'Hard',
    categories: ['Array', 'Dynamic Programming', 'Matrix'],
    description: '',
    question_link: 'https://leetcode.com/problems/maximum-vacation-days',
    solution_link:
      'https://leetcode.com/problems/maximum-vacation-days/solutions',
  },
  {
    id: 170,
    title: 'Managers with at Least 5 Direct Reports',
    difficulty: 'Medium',
    categories: ['Database'],
    description:
      '<p>Table: <code>Employee</code></p>\n\n<pre>+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| name        | varchar |\n| department  | varchar |\n| managerId   | int     |\n+-------------+---------+\nid is the primary key (column with unique values) for this table.\nEach row of this table indicates the name of an employee, their department, and the id of their manager.\nIf managerId is null, then the employee does not have a manager.\nNo employee will be the manager of themself.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find managers with at least <strong>five direct reports</strong>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nEmployee table:\n+-----+-------+------------+-----------+\n| id  | name  | department | managerId |\n+-----+-------+------------+-----------+\n| 101 | John  | A          | None      |\n| 102 | Dan   | A          | 101       |\n| 103 | James | A          | 101       |\n| 104 | Amy   | A          | 101       |\n| 105 | Anne  | A          | 101       |\n| 106 | Ron   | B          | 101       |\n+-----+-------+------------+-----------+\n<strong>Output:</strong> \n+------+\n| name |\n+------+\n| John |\n+------+\n</pre>\n',
    question_link:
      'https://leetcode.com/problems/managers-with-at-least-5-direct-reports',
    solution_link:
      'https://leetcode.com/problems/managers-with-at-least-5-direct-reports/solutions',
  },
  {
    id: 171,
    title: 'Find Median Given Frequency of Numbers',
    difficulty: 'Hard',
    categories: ['Database'],
    description: '',
    question_link:
      'https://leetcode.com/problems/find-median-given-frequency-of-numbers',
    solution_link:
      'https://leetcode.com/problems/find-median-given-frequency-of-numbers/solutions',
  },
  {
    id: 172,
    title: 'Subtree of Another Tree',
    difficulty: 'Easy',
    categories: ['Tree', 'Depth-First Search', 'String Matching', '2+'],
    description:
      '<p>Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return <code>true</code> if there is a subtree of <code>root</code> with the same structure and node values of<code> subRoot</code> and <code>false</code> otherwise.</p>\n\n<p>A subtree of a binary tree <code>tree</code> is a tree that consists of a node in <code>tree</code> and all of this node\'s descendants. The tree <code>tree</code> could also be considered as a subtree of itself.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg" style="width: 532px; height: 400px;">\n<pre><strong>Input:</strong> root = [3,4,5,1,2], subRoot = [4,1,2]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg" style="width: 502px; height: 458px;">\n<pre><strong>Input:</strong> root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]\n<strong>Output:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the <code>root</code> tree is in the range <code>[1, 2000]</code>.</li>\n\t<li>The number of nodes in the <code>subRoot</code> tree is in the range <code>[1, 1000]</code>.</li>\n\t<li><code>-10<sup>4</sup> &lt;= root.val &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= subRoot.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/subtree-of-another-tree',
    solution_link:
      'https://leetcode.com/problems/subtree-of-another-tree/solutions',
  },
  {
    id: 175,
    title: 'Distribute Candies',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table'],
    description:
      '<p>Alice has <code>n</code> candies, where the <code>i<sup>th</sup></code> candy is of type <code>candyType[i]</code>. Alice noticed that she started to gain weight, so she visited a doctor.</p>\n\n<p>The doctor advised Alice to only eat <code>n / 2</code> of the candies she has (<code>n</code> is always even). Alice likes her candies very much, and she wants to eat the maximum number of different types of candies while still following the doctor\'s advice.</p>\n\n<p>Given the integer array <code>candyType</code> of length <code>n</code>, return <em>the <strong>maximum</strong> number of different types of candies she can eat if she only eats </em><code>n / 2</code><em> of them</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> candyType = [1,1,2,2,3,3]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Alice can only eat 6 / 2 = 3 candies. Since there are only 3 types, she can eat one of each type.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> candyType = [1,1,2,3]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> Alice can only eat 4 / 2 = 2 candies. Whether she eats types [1,2], [1,3], or [2,3], she still can only eat 2 different types.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> candyType = [6,6,6,6]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> Alice can only eat 4 / 2 = 2 candies. Even though she can eat 2 candies, she only has 1 type.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>n == candyType.length</code></li>\n\t<li><code>2 &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>n</code>&nbsp;is even.</li>\n\t<li><code>-10<sup>5</sup> &lt;= candyType[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/distribute-candies',
    solution_link: 'https://leetcode.com/problems/distribute-candies/solutions',
  },
  {
    id: 176,
    title: 'Out of Boundary Paths',
    difficulty: 'Medium',
    categories: ['Dynamic Programming'],
    description:
      '<p>There is an <code>m x n</code> grid with a ball. The ball is initially at the position <code>[startRow, startColumn]</code>. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply <strong>at most</strong> <code>maxMove</code> moves to the ball.</p>\n\n<p>Given the five integers <code>m</code>, <code>n</code>, <code>maxMove</code>, <code>startRow</code>, <code>startColumn</code>, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/out_of_boundary_paths_1.png" style="width: 500px; height: 296px;">\n<pre><strong>Input:</strong> m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0\n<strong>Output:</strong> 6\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/out_of_boundary_paths_2.png" style="width: 500px; height: 293px;">\n<pre><strong>Input:</strong> m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1\n<strong>Output:</strong> 12\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 50</code></li>\n\t<li><code>0 &lt;= maxMove &lt;= 50</code></li>\n\t<li><code>0 &lt;= startRow &lt; m</code></li>\n\t<li><code>0 &lt;= startColumn &lt; n</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/out-of-boundary-paths',
    solution_link:
      'https://leetcode.com/problems/out-of-boundary-paths/solutions',
  },
  {
    id: 177,
    title: 'Employee Bonus',
    difficulty: 'Easy',
    categories: ['Database'],
    description:
      '<p>Table: <code>Employee</code></p>\n\n<pre>+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| empId       | int     |\n| name        | varchar |\n| supervisor  | int     |\n| salary      | int     |\n+-------------+---------+\nempId is the column with unique values for this table.\nEach row of this table indicates the name and the ID of an employee in addition to their salary and the id of their manager.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Table: <code>Bonus</code></p>\n\n<pre>+-------------+------+\n| Column Name | Type |\n+-------------+------+\n| empId       | int  |\n| bonus       | int  |\n+-------------+------+\nempId is the column of unique values for this table.\nempId is a foreign key (reference column) to empId from the Employee table.\nEach row of this table contains the id of an employee and their respective bonus.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the name and bonus amount of each employee with a bonus <strong>less than</strong> <code>1000</code>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nEmployee table:\n+-------+--------+------------+--------+\n| empId | name   | supervisor | salary |\n+-------+--------+------------+--------+\n| 3     | Brad   | null       | 4000   |\n| 1     | John   | 3          | 1000   |\n| 2     | Dan    | 3          | 2000   |\n| 4     | Thomas | 3          | 4000   |\n+-------+--------+------------+--------+\nBonus table:\n+-------+-------+\n| empId | bonus |\n+-------+-------+\n| 2     | 500   |\n| 4     | 2000  |\n+-------+-------+\n<strong>Output:</strong> \n+------+-------+\n| name | bonus |\n+------+-------+\n| Brad | null  |\n| John | null  |\n| Dan  | 500   |\n+------+-------+\n</pre>\n',
    question_link: 'https://leetcode.com/problems/employee-bonus',
    solution_link: 'https://leetcode.com/problems/employee-bonus/solutions',
  },
  {
    id: 181,
    title: 'Shortest Unsorted Continuous Subarray',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'Stack', '3+'],
    description:
      '<p>Given an integer array <code>nums</code>, you need to find one <b>continuous subarray</b> such that if you only sort this subarray in non-decreasing order, then the whole array will be sorted in non-decreasing order.</p>\n\n<p>Return <em>the shortest such subarray and output its length</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [2,6,4,8,10,9,15]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> 0\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow up:</strong> Can you solve it in <code>O(n)</code> time complexity?',
    question_link:
      'https://leetcode.com/problems/shortest-unsorted-continuous-subarray',
    solution_link:
      'https://leetcode.com/problems/shortest-unsorted-continuous-subarray/solutions',
  },
  {
    id: 182,
    title: 'Kill Process',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Tree', '2+'],
    description: '',
    question_link: 'https://leetcode.com/problems/kill-process',
    solution_link: 'https://leetcode.com/problems/kill-process/solutions',
  },
  {
    id: 183,
    title: 'Delete Operation for Two Strings',
    difficulty: 'Medium',
    categories: ['String', 'Dynamic Programming'],
    description:
      '<p>Given two strings <code>word1</code> and <code>word2</code>, return <em>the minimum number of <strong>steps</strong> required to make</em> <code>word1</code> <em>and</em> <code>word2</code> <em>the same</em>.</p>\n\n<p>In one <strong>step</strong>, you can delete exactly one character in either string.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> word1 = "sea", word2 = "eat"\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> You need one step to make "sea" to "ea" and another step to make "eat" to "ea".\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> word1 = "leetcode", word2 = "etco"\n<strong>Output:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word1.length, word2.length &lt;= 500</code></li>\n\t<li><code>word1</code> and <code>word2</code> consist of only lowercase English letters.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/delete-operation-for-two-strings',
    solution_link:
      'https://leetcode.com/problems/delete-operation-for-two-strings/solutions',
  },
  {
    id: 184,
    title: 'Find Customer Referee',
    difficulty: 'Easy',
    categories: ['Database'],
    description:
      '<p>Table: <code>Customer</code></p>\n\n<pre>+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| name        | varchar |\n| referee_id  | int     |\n+-------------+---------+\nIn SQL, id is the primary key column for this table.\nEach row of this table indicates the id of a customer, their name, and the id of the customer who referred them.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Find the names of the customer that are <strong>not referred by</strong> the customer with <code>id = 2</code>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nCustomer table:\n+----+------+------------+\n| id | name | referee_id |\n+----+------+------------+\n| 1  | Will | null       |\n| 2  | Jane | null       |\n| 3  | Alex | 2          |\n| 4  | Bill | null       |\n| 5  | Zack | 1          |\n| 6  | Mark | 2          |\n+----+------+------------+\n<strong>Output:</strong> \n+------+\n| name |\n+------+\n| Will |\n| Jane |\n| Bill |\n| Zack |\n+------+\n</pre>\n',
    question_link: 'https://leetcode.com/problems/find-customer-referee',
    solution_link:
      'https://leetcode.com/problems/find-customer-referee/solutions',
  },
  {
    id: 185,
    title: 'Investments in 2016',
    difficulty: 'Medium',
    categories: ['Database'],
    description:
      "<p>Table: <code>Insurance</code></p>\n\n<pre>+-------------+-------+\n| Column Name | Type  |\n+-------------+-------+\n| pid         | int   |\n| tiv_2015    | float |\n| tiv_2016    | float |\n| lat         | float |\n| lon         | float |\n+-------------+-------+\npid is the primary key (column with unique values) for this table.\nEach row of this table contains information about one policy where:\npid is the policyholder's policy ID.\ntiv_2015 is the total investment value in 2015 and tiv_2016 is the total investment value in 2016.\nlat is the latitude of the policy holder's city. It's guaranteed that lat is not NULL.\nlon is the longitude of the policy holder's city. It's guaranteed that lon is not NULL.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to report the sum of all total investment values in 2016 <code>tiv_2016</code>, for all policyholders who:</p>\n\n<ul>\n\t<li>have the same <code>tiv_2015</code> value as one or more other policyholders, and</li>\n\t<li>are not located in the same city as any other policyholder (i.e., the (<code>lat, lon</code>) attribute pairs must be unique).</li>\n</ul>\n\n<p>Round <code>tiv_2016</code> to <strong>two decimal places</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nInsurance table:\n+-----+----------+----------+-----+-----+\n| pid | tiv_2015 | tiv_2016 | lat | lon |\n+-----+----------+----------+-----+-----+\n| 1   | 10       | 5        | 10  | 10  |\n| 2   | 20       | 20       | 20  | 20  |\n| 3   | 10       | 30       | 20  | 20  |\n| 4   | 10       | 40       | 40  | 40  |\n+-----+----------+----------+-----+-----+\n<strong>Output:</strong> \n+----------+\n| tiv_2016 |\n+----------+\n| 45.00    |\n+----------+\n<strong>Explanation:</strong> \nThe first record in the table, like the last record, meets both of the two criteria.\nThe tiv_2015 value 10 is the same as the third and fourth records, and its location is unique.\n\nThe second record does not meet any of the two criteria. Its tiv_2015 is not like any other policyholders and its location is the same as the third record, which makes the third record fail, too.\nSo, the result is the sum of tiv_2016 of the first and last record, which is 45.\n</pre>\n",
    question_link: 'https://leetcode.com/problems/investments-in-2016',
    solution_link:
      'https://leetcode.com/problems/investments-in-2016/solutions',
  },
  {
    id: 186,
    title: 'Customer Placing the Largest Number of Orders',
    difficulty: 'Easy',
    categories: ['Database'],
    description:
      '<p>Table: <code>Orders</code></p>\n\n<pre>+-----------------+----------+\n| Column Name     | Type     |\n+-----------------+----------+\n| order_number    | int      |\n| customer_number | int      |\n+-----------------+----------+\norder_number is the primary key (column with unique values) for this table.\nThis table contains information about the order ID and the customer ID.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find the <code>customer_number</code> for the customer who has placed <strong>the largest number of orders</strong>.</p>\n\n<p>The test cases are generated so that <strong>exactly one customer</strong> will have placed more orders than any other customer.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nOrders table:\n+--------------+-----------------+\n| order_number | customer_number |\n+--------------+-----------------+\n| 1            | 1               |\n| 2            | 2               |\n| 3            | 3               |\n| 4            | 3               |\n+--------------+-----------------+\n<strong>Output:</strong> \n+-----------------+\n| customer_number |\n+-----------------+\n| 3               |\n+-----------------+\n<strong>Explanation:</strong> \nThe customer with number 3 has two orders, which is greater than either customer 1 or 2 because each of them only has one order. \nSo the result is customer_number 3.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> What if more than one customer has the largest number of orders, can you find all the <code>customer_number</code> in this case?</p>\n',
    question_link:
      'https://leetcode.com/problems/customer-placing-the-largest-number-of-orders',
    solution_link:
      'https://leetcode.com/problems/customer-placing-the-largest-number-of-orders/solutions',
  },
  {
    id: 187,
    title: 'Erect the Fence',
    difficulty: 'Hard',
    categories: ['Array', 'Math', 'Geometry'],
    description:
      '<p>You are given an array <code>trees</code> where <code>trees[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents the location of a tree in the garden.</p>\n\n<p>Fence the entire garden using the minimum length of rope, as it is expensive. The garden is well-fenced only if <strong>all the trees are enclosed</strong>.</p>\n\n<p>Return <em>the coordinates of trees that are exactly located on the fence perimeter</em>. You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/erect2-plane.jpg" style="width: 400px; height: 393px;">\n<pre><strong>Input:</strong> trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]\n<strong>Output:</strong> [[1,1],[2,0],[4,2],[3,3],[2,4]]\n<strong>Explanation:</strong> All the trees will be on the perimeter of the fence except the tree at [2, 2], which will be inside the fence.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/erect1-plane.jpg" style="width: 400px; height: 393px;">\n<pre><strong>Input:</strong> trees = [[1,2],[2,2],[4,2]]\n<strong>Output:</strong> [[4,2],[2,2],[1,2]]\n<strong>Explanation:</strong> The fence forms a line that passes through all the trees.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= trees.length &lt;= 3000</code></li>\n\t<li><code>trees[i].length == 2</code></li>\n\t<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 100</code></li>\n\t<li>All the given positions are <strong>unique</strong>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/erect-the-fence',
    solution_link: 'https://leetcode.com/problems/erect-the-fence/solutions',
  },
  {
    id: 189,
    title: 'N-ary Tree Preorder Traversal',
    difficulty: 'Easy',
    categories: ['Stack', 'Tree', 'Depth-First Search'],
    description:
      '<p>Given the <code>root</code> of an n-ary tree, return <em>the preorder traversal of its nodes\' values</em>.</p>\n\n<p>Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;"></p>\n\n<pre><strong>Input:</strong> root = [1,null,3,2,4,null,5,6]\n<strong>Output:</strong> [1,3,5,6,2,4]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="width: 296px; height: 241px;"></p>\n\n<pre><strong>Input:</strong> root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]\n<strong>Output:</strong> [1,2,3,6,7,11,14,4,8,12,5,9,13,10]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li>The height of the n-ary tree is less than or equal to <code>1000</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Recursive solution is trivial, could you do it iteratively?</p>\n',
    question_link:
      'https://leetcode.com/problems/n-ary-tree-preorder-traversal',
    solution_link:
      'https://leetcode.com/problems/n-ary-tree-preorder-traversal/solutions',
  },
  {
    id: 190,
    title: 'N-ary Tree Postorder Traversal',
    difficulty: 'Easy',
    categories: ['Stack', 'Tree', 'Depth-First Search'],
    description:
      '<p>Given the <code>root</code> of an n-ary tree, return <em>the postorder traversal of its nodes\' values</em>.</p>\n\n<p>Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;">\n<pre><strong>Input:</strong> root = [1,null,3,2,4,null,5,6]\n<strong>Output:</strong> [5,6,3,2,4,1]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="width: 296px; height: 241px;">\n<pre><strong>Input:</strong> root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]\n<strong>Output:</strong> [2,6,14,11,7,3,12,8,4,13,9,10,5,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li>The height of the n-ary tree is less than or equal to <code>1000</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n<p><strong>Follow up:</strong> Recursive solution is trivial, could you do it iteratively?</p>\n',
    question_link:
      'https://leetcode.com/problems/n-ary-tree-postorder-traversal',
    solution_link:
      'https://leetcode.com/problems/n-ary-tree-postorder-traversal/solutions',
  },
  {
    id: 191,
    title: 'Tag Validator',
    difficulty: 'Hard',
    categories: ['String', 'Stack'],
    description:
      '<p>Given a string representing a code snippet, implement a tag validator to parse the code and return whether it is valid.</p>\n\n<p>A code snippet is valid if all the following rules hold:</p>\n\n<ol>\n\t<li>The code must be wrapped in a <b>valid closed tag</b>. Otherwise, the code is invalid.</li>\n\t<li>A <b>closed tag</b> (not necessarily valid) has exactly the following format : <code>&lt;TAG_NAME&gt;TAG_CONTENT&lt;/TAG_NAME&gt;</code>. Among them, <code>&lt;TAG_NAME&gt;</code> is the start tag, and <code>&lt;/TAG_NAME&gt;</code> is the end tag. The TAG_NAME in start and end tags should be the same. A closed tag is <b>valid</b> if and only if the TAG_NAME and TAG_CONTENT are valid.</li>\n\t<li>A <b>valid</b> <code>TAG_NAME</code> only contain <b>upper-case letters</b>, and has length in range [1,9]. Otherwise, the <code>TAG_NAME</code> is <b>invalid</b>.</li>\n\t<li>A <b>valid</b> <code>TAG_CONTENT</code> may contain other <b>valid closed tags</b>, <b>cdata</b> and any characters (see note1) <b>EXCEPT</b> unmatched <code>&lt;</code>, unmatched start and end tag, and unmatched or closed tags with invalid TAG_NAME. Otherwise, the <code>TAG_CONTENT</code> is <b>invalid</b>.</li>\n\t<li>A start tag is unmatched if no end tag exists with the same TAG_NAME, and vice versa. However, you also need to consider the issue of unbalanced when tags are nested.</li>\n\t<li>A <code>&lt;</code> is unmatched if you cannot find a subsequent <code>&gt;</code>. And when you find a <code>&lt;</code> or <code>&lt;/</code>, all the subsequent characters until the next <code>&gt;</code> should be parsed as TAG_NAME (not necessarily valid).</li>\n\t<li>The cdata has the following format : <code>&lt;![CDATA[CDATA_CONTENT]]&gt;</code>. The range of <code>CDATA_CONTENT</code> is defined as the characters between <code>&lt;![CDATA[</code> and the <b>first subsequent</b> <code>]]&gt;</code>.</li>\n\t<li><code>CDATA_CONTENT</code> may contain <b>any characters</b>. The function of cdata is to forbid the validator to parse <code>CDATA_CONTENT</code>, so even it has some characters that can be parsed as tag (no matter valid or invalid), you should treat it as <b>regular characters</b>.</li>\n</ol>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> code = "&lt;DIV&gt;This is the first line &lt;![CDATA[&lt;div&gt;]]&gt;&lt;/DIV&gt;"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> \nThe code is wrapped in a closed tag : &lt;DIV&gt; and &lt;/DIV&gt;. \nThe TAG_NAME is valid, the TAG_CONTENT consists of some characters and cdata. \nAlthough CDATA_CONTENT has an unmatched start tag with invalid TAG_NAME, it should be considered as plain text, not parsed as a tag.\nSo TAG_CONTENT is valid, and then the code is valid. Thus return true.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> code = "&lt;DIV&gt;&gt;&gt;  ![cdata[]] &lt;![CDATA[&lt;div&gt;]&gt;]]&gt;]]&gt;&gt;]&lt;/DIV&gt;"\n<strong>Output:</strong> true\n<strong>Explanation:</strong>\nWe first separate the code into : start_tag|tag_content|end_tag.\nstart_tag -&gt; <b>"&lt;DIV&gt;"</b>\nend_tag -&gt; <b>"&lt;/DIV&gt;"</b>\ntag_content could also be separated into : text1|cdata|text2.\ntext1 -&gt; <b>"&gt;&gt;  ![cdata[]] "</b>\ncdata -&gt; <b>"&lt;![CDATA[&lt;div&gt;]&gt;]]&gt;"</b>, where the CDATA_CONTENT is <b>"&lt;div&gt;]&gt;"</b>\ntext2 -&gt; <b>"]]&gt;&gt;]"</b>\nThe reason why start_tag is NOT <b>"&lt;DIV&gt;&gt;&gt;"</b> is because of the rule 6.\nThe reason why cdata is NOT <b>"&lt;![CDATA[&lt;div&gt;]&gt;]]&gt;]]&gt;"</b> is because of the rule 7.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> code = "&lt;A&gt;  &lt;B&gt; &lt;/A&gt;   &lt;/B&gt;"\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Unbalanced. If "&lt;A&gt;" is closed, then "&lt;B&gt;" must be unmatched, and vice versa.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= code.length &lt;= 500</code></li>\n\t<li><code>code</code> consists of English letters, digits, <code>\'&lt;\'</code>, <code>\'&gt;\'</code>, <code>\'/\'</code>, <code>\'!\'</code>, <code>\'[\'</code>, <code>\']\'</code>, <code>\'.\'</code>, and <code>\' \'</code>.</li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/tag-validator',
    solution_link: 'https://leetcode.com/problems/tag-validator/solutions',
  },
  {
    id: 192,
    title: 'Fraction Addition and Subtraction',
    difficulty: 'Medium',
    categories: ['Math', 'String', 'Simulation'],
    description:
      '<p>Given a string <code>expression</code> representing an expression of fraction addition and subtraction, return the calculation result in string format.</p>\n\n<p>The final result should be an <a href="https://en.wikipedia.org/wiki/Irreducible_fraction" target="_blank">irreducible fraction</a>. If your final result is an integer, change it to the format of a fraction that has a denominator <code>1</code>. So in this case, <code>2</code> should be converted to <code>2/1</code>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> expression = "-1/2+1/2"\n<strong>Output:</strong> "0/1"\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> expression = "-1/2+1/2+1/3"\n<strong>Output:</strong> "1/3"\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> expression = "1/3-1/2"\n<strong>Output:</strong> "-1/6"\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The input string only contains <code>\'0\'</code> to <code>\'9\'</code>, <code>\'/\'</code>, <code>\'+\'</code> and <code>\'-\'</code>. So does the output.</li>\n\t<li>Each fraction (input and output) has the format <code>\u00b1numerator/denominator</code>. If the first input fraction or the output is positive, then <code>\'+\'</code> will be omitted.</li>\n\t<li>The input only contains valid <strong>irreducible fractions</strong>, where the <strong>numerator</strong> and <strong>denominator</strong> of each fraction will always be in the range <code>[1, 10]</code>. If the denominator is <code>1</code>, it means this fraction is actually an integer in a fraction format defined above.</li>\n\t<li>The number of given fractions will be in the range <code>[1, 10]</code>.</li>\n\t<li>The numerator and denominator of the <strong>final result</strong> are guaranteed to be valid and in the range of <strong>32-bit</strong> int.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/fraction-addition-and-subtraction',
    solution_link:
      'https://leetcode.com/problems/fraction-addition-and-subtraction/solutions',
  },
  {
    id: 193,
    title: 'Valid Square',
    difficulty: 'Medium',
    categories: ['Math', 'Geometry'],
    description:
      '<p>Given the coordinates of four points in 2D space <code>p1</code>, <code>p2</code>, <code>p3</code> and <code>p4</code>, return <code>true</code> <em>if the four points construct a square</em>.</p>\n\n<p>The coordinate of a point <code>p<sub>i</sub></code> is represented as <code>[x<sub>i</sub>, y<sub>i</sub>]</code>. The input is <strong>not</strong> given in any order.</p>\n\n<p>A <strong>valid square</strong> has four equal sides with positive length and four equal angles (90-degree angles).</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]\n<strong>Output:</strong> true\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]\n<strong>Output:</strong> false\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]\n<strong>Output:</strong> true\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>p1.length == p2.length == p3.length == p4.length == 2</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/valid-square',
    solution_link: 'https://leetcode.com/problems/valid-square/solutions',
  },
  {
    id: 194,
    title: 'Longest Harmonious Subsequence',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table', 'Sorting'],
    description:
      '<p>We define a harmonious array as an array where the difference between its maximum value and its minimum value is <b>exactly</b> <code>1</code>.</p>\n\n<p>Given an integer array <code>nums</code>, return <em>the length of its longest harmonious subsequence among all its possible subsequences</em>.</p>\n\n<p>A <strong>subsequence</strong> of array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,3,2,2,5,2,3,7]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> The longest harmonious subsequence is [3,2,2,2,3].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> nums = [1,1,1,1]\n<strong>Output:</strong> 0\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>',
    question_link:
      'https://leetcode.com/problems/longest-harmonious-subsequence',
    solution_link:
      'https://leetcode.com/problems/longest-harmonious-subsequence/solutions',
  },
  {
    id: 195,
    title: 'Big Countries',
    difficulty: 'Easy',
    categories: ['Database'],
    description:
      '<p>Table: <code>World</code></p>\n\n<pre>+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| name        | varchar |\n| continent   | varchar |\n| area        | int     |\n| population  | int     |\n| gdp         | bigint  |\n+-------------+---------+\nname is the primary key (column with unique values) for this table.\nEach row of this table gives information about the name of a country, the continent to which it belongs, its area, the population, and its GDP value.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>A country is <strong>big</strong> if:</p>\n\n<ul>\n\t<li>it has an area of at least&nbsp;three million (i.e., <code>3000000 km<sup>2</sup></code>), or</li>\n\t<li>it has a population of at least&nbsp;twenty-five million (i.e., <code>25000000</code>).</li>\n</ul>\n\n<p>Write a solution to find the name, population, and area of the <strong>big countries</strong>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nWorld table:\n+-------------+-----------+---------+------------+--------------+\n| name        | continent | area    | population | gdp          |\n+-------------+-----------+---------+------------+--------------+\n| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |\n| Albania     | Europe    | 28748   | 2831741    | 12960000000  |\n| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |\n| Andorra     | Europe    | 468     | 78115      | 3712000000   |\n| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |\n+-------------+-----------+---------+------------+--------------+\n<strong>Output:</strong> \n+-------------+------------+---------+\n| name        | population | area    |\n+-------------+------------+---------+\n| Afghanistan | 25500100   | 652230  |\n| Algeria     | 37100000   | 2381741 |\n+-------------+------------+---------+\n</pre>\n',
    question_link: 'https://leetcode.com/problems/big-countries',
    solution_link: 'https://leetcode.com/problems/big-countries/solutions',
  },
  {
    id: 196,
    title: 'Classes More Than 5 Students',
    difficulty: 'Easy',
    categories: ['Database'],
    description:
      '<p>Table: <code>Courses</code></p>\n\n<pre>+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| student     | varchar |\n| class       | varchar |\n+-------------+---------+\n(student, class) is the primary key (combination of columns with unique values) for this table.\nEach row of this table indicates the name of a student and the class in which they are enrolled.\n</pre>\n\n<p>&nbsp;</p>\n\n<p>Write a solution to find all the classes that have <strong>at least five students</strong>.</p>\n\n<p>Return the result table in <strong>any order</strong>.</p>\n\n<p>The&nbsp;result format is in the following example.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> \nCourses table:\n+---------+----------+\n| student | class    |\n+---------+----------+\n| A       | Math     |\n| B       | English  |\n| C       | Math     |\n| D       | Biology  |\n| E       | Math     |\n| F       | Computer |\n| G       | Math     |\n| H       | Math     |\n| I       | Math     |\n+---------+----------+\n<strong>Output:</strong> \n+---------+\n| class   |\n+---------+\n| Math    |\n+---------+\n<strong>Explanation:</strong> \n- Math has 6 students, so we include it.\n- English has 1 student, so we do not include it.\n- Biology has 1 student, so we do not include it.\n- Computer has 1 student, so we do not include it.\n</pre>\n',
    question_link: 'https://leetcode.com/problems/classes-more-than-5-students',
    solution_link:
      'https://leetcode.com/problems/classes-more-than-5-students/solutions',
  },
  {
    id: 198,
    title: 'Range Addition II',
    difficulty: 'Easy',
    categories: ['Array', 'Math'],
    description:
      '<p>You are given an <code>m x n</code> matrix <code>M</code> initialized with all <code>0</code>\'s and an array of operations <code>ops</code>, where <code>ops[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> means <code>M[x][y]</code> should be incremented by one for all <code>0 &lt;= x &lt; a<sub>i</sub></code> and <code>0 &lt;= y &lt; b<sub>i</sub></code>.</p>\n\n<p>Count and return <em>the number of maximum integers in the matrix after performing all the operations</em>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2020/10/02/ex1.jpg" style="width: 750px; height: 176px;">\n<pre><strong>Input:</strong> m = 3, n = 3, ops = [[2,2],[3,3]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The maximum integer in M is 2, and there are four of it in M. So return 4.\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> m = 3, n = 3, ops = [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]\n<strong>Output:</strong> 4\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> m = 3, n = 3, ops = []\n<strong>Output:</strong> 9\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 4 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= ops.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>ops[i].length == 2</code></li>\n\t<li><code>1 &lt;= a<sub>i</sub> &lt;= m</code></li>\n\t<li><code>1 &lt;= b<sub>i</sub> &lt;= n</code></li>\n</ul>\n',
    question_link: 'https://leetcode.com/problems/range-addition-ii',
    solution_link: 'https://leetcode.com/problems/range-addition-ii/solutions',
  },
  {
    id: 199,
    title: 'Minimum Index Sum of Two Lists',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table', 'String'],
    description:
      '<p>Given two arrays of strings <code>list1</code> and <code>list2</code>, find the <strong>common strings with the least index sum</strong>.</p>\n\n<p>A <strong>common string</strong> is a string that appeared in both <code>list1</code> and <code>list2</code>.</p>\n\n<p>A <strong>common string with the least index sum</strong> is a common string such that if it appeared at <code>list1[i]</code> and <code>list2[j]</code> then <code>i + j</code> should be the minimum value among all the other <strong>common strings</strong>.</p>\n\n<p>Return <em>all the <strong>common strings with the least index sum</strong></em>. Return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]\n<strong>Output:</strong> ["Shogun"]\n<strong>Explanation:</strong> The only common string is "Shogun".\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]\n<strong>Output:</strong> ["Shogun"]\n<strong>Explanation:</strong> The common string with the least index sum is "Shogun" with index sum = (0 + 1) = 1.\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]\n<strong>Output:</strong> ["sad","happy"]\n<strong>Explanation:</strong> There are three common strings:\n"happy" with index sum = (0 + 1) = 1.\n"sad" with index sum = (1 + 0) = 1.\n"good" with index sum = (2 + 2) = 4.\nThe strings with the least index sum are "sad" and "happy".\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= list1.length, list2.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= list1[i].length, list2[i].length &lt;= 30</code></li>\n\t<li><code>list1[i]</code> and <code>list2[i]</code> consist of spaces <code>\' \'</code> and English letters.</li>\n\t<li>All the strings of <code>list1</code> are <strong>unique</strong>.</li>\n\t<li>All the strings of <code>list2</code> are <strong>unique</strong>.</li>\n\t<li>There is at least a common string between <code>list1</code> and <code>list2</code>.</li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/minimum-index-sum-of-two-lists',
    solution_link:
      'https://leetcode.com/problems/minimum-index-sum-of-two-lists/solutions',
  },
  {
    id: 200,
    title: 'Non-negative Integers without Consecutive Ones',
    difficulty: 'Hard',
    categories: ['Dynamic Programming'],
    description:
      '<p>Given a positive integer <code>n</code>, return the number of the integers in the range <code>[0, n]</code> whose binary representations <strong>do not</strong> contain consecutive ones.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre><strong>Input:</strong> n = 5\n<strong>Output:</strong> 5\n<strong>Explanation:</strong>\nHere are the non-negative integers &lt;= 5 with their corresponding binary representations:\n0 : 0\n1 : 1\n2 : 10\n3 : 11\n4 : 100\n5 : 101\nAmong them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule. \n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> 2\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre><strong>Input:</strong> n = 2\n<strong>Output:</strong> 3\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>\n</ul>\n',
    question_link:
      'https://leetcode.com/problems/non-negative-integers-without-consecutive-ones',
    solution_link:
      'https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/solutions',
  },
];

export { columns, questions, difficultyOptions, categoriesOptions };

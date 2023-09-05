// Question Id Question Title Question Description Question Category Question Complexity

const questions = [
  {
    id: '1',
    title: 'Reverse a String',
    categories : ['Strings', 'Algorithms'],
    complexity: 'Easy',
    description: `
    Write a function that reverses a string. The input string is given as an array 
    of characters s. 
    
    You must do this by modifying the input array in-place with O(1) extra 
    memory. 
    
    
    Example 1: 
    
    Input: s = ["h","e","l","l","o"] 
    Output: ["o","l","l","e","h"] 
    Example 2: 
    
    Input: s = ["H","a","n","n","a","h"] 
    Output: ["h","a","n","n","a","H"] 
    
    Constraints: 
    
    \u2022 1 <= s.length <= 105
    \u2022 s[i] is a printable ascii character. 
    `
  }, 
  {
    id: '2',
    title: 'Linked List Cycle Detection',
    categories : ['Data Structures', 'Algorithms'],
    complexity: 'Easy',
    description: `
    Given head, the head of a linked list, determine if the linked list has a cycle 
    in it. 
    There is a cycle in a linked list if there is some node in the list that can be 
    reached again by continuously following the next pointer. Internally, pos is 
    used to denote the index of the node that tail's next pointer is connected to. 
    Note that pos is not passed as a parameter. 
    Return true if there is a cycle in the linked list. Otherwise, return false. 
    Example 1: 
    Page 14 of 28
    Input: head = [3,2,0,-4], pos = 1 
    Output: true 
    Explanation: There is a cycle in the linked list, where the tail connects to the 
    1st node (0-indexed). 
    Example 2: 
    Input: head = [1,2], pos = 0 
    Output: true 
    Explanation: There is a cycle in the linked list, where the tail connects to the 
    0th node. 
    Example 3: 
    Input: head = [1], pos = -1 
    Output: false 
    Explanation: There is no cycle in the linked list. 
    Constraints: 
     The number of the nodes in the list is in the range [0, 104]. 
     -105
     <= Node.val <= 105
     pos is -1 or a valid index in the linked-list. 
     
    Follow up: Can you solve it using O(1) (i.e. constant) memory? 
    
    `
  },
  {
    id: '3',
    title: 'Roman to Interger',
    categories : ['Algorithms'],
    complexity: 'Easy',
    description: `
    Roman numerals are represented by seven different symbols: I, V, X, L, C, D 
    and M. 
    Symbol Value 
    I 1 
    V 5 
    X 10 
    L 50 
    C 100 
    D 500 
    M 1000 
    For example, 2 is written as II in Roman numeral, just two ones added 
    together. 12 is written as XII, which is simply X + II. The number 27 is written 
    as XXVII, which is XX + V + II. 
    Roman numerals are usually written largest to smallest from left to right. 
    However, the numeral for four is not IIII. Instead, the number four is written 
    Page 15 of 28
    as IV. Because the one is before the five we subtract it making four. The 
    same principle applies to the number nine, which is written as IX. There are 
    six instances where subtraction is used: 
    I can be placed before V (5) and X (10) to make 4 and 9. 
    X can be placed before L (50) and C (100) to make 40 and 90. 
    C can be placed before D (500) and M (1000) to make 400 and 900. 
    Given a roman numeral, convert it to an integer. 
    
    Example 1: 
    Input: s = "III" 
    Output: 3 
    Explanation: III = 3. 
    Example 2: 
    Input: s = "LVIII" 
    Output: 58 
    Explanation: L = 50, V= 5, III = 3. 
    Example 3: 
    Input: s = "MCMXCIV" 
    Output: 1994 
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4. 
    
    Constraints: 
     1 <= s.length <= 15 
     s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M'). 
     It is guaranteed that s is a valid roman numeral in the range [1, 
    3999]. 

    `
  },

]

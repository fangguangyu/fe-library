// 链表的插入与删除的关键在于找到结点的前驱点。

// 链表查找的时间复杂度为O(n)，而插入的时间复杂度为O(1)

// 数组查找的时间复杂度为O(1)，而插入的时间复杂度为O(n)

function ListNode(val) {
  this.val = val;
  this.next = null;
}

const node = new ListNode(0);
const node1 = new ListNode(1);
const node2 = new ListNode(2);

node.next = node1;
node2.next = node.next;
node.next = node2;
console.log(node);
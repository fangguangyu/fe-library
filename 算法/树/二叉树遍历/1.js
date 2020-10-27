const root = {
  val : 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
    },
    right: {
      val: 'E'
    }
  },
  right: {
    val: 'C',
    right: {
      val: 'F'
    }
  }
}

// 二叉树先序遍历
// function preOrder(root) {
//   if(!root) {
//     return ;
//   }

//   console.log('当前遍历的结点值是: ', root.val);
//   // 递归遍历左子树
//   preOrder(root.left);
//   // 递归遍历右子树
//   preOrder(root.right);
// }

// preOrder(root);



// 二叉树中序遍历
// function inOrder(root) {
//   if(!root) {
//     return ;
//   }

//   inOrder(root.left);

//   console.log('当前的结点值为: ', root.val);

//   inOrder(root.right);
// }

// inOrder(root);

// 二叉树后序遍历
function postOrder(root) {
  if(!root) {
    return;
  }

  postOrder(root.left);

  postOrder(root.right);

  console.log('当前遍历的节点是:', root.val);
}

postOrder(root);
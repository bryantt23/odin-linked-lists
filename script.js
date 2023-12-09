class LinkedList {
  constructor() {
    this.headNode = null;
    this.tailNode = null;
  }
  append = value => {
    const newNode = new Node(value);
    if (this.headNode === null) {
      this.headNode = newNode; //first node
    } else if (this.headNode === this.tailNode) {
      this.headNode.nextNode = newNode; //now 2 nodes, head points to new
    } else {
      this.tailNode.nextNode = newNode; //tail points to new
    }
    this.tailNode = newNode;
  };
  prepend = value => {
    const newNode = new Node(value);
    if (this.headNode === null) {
      this.tailNode = newNode; //first node
    } else {
      newNode.nextNode = this.headNode; //tail points to new
    }
    this.headNode = newNode;
  };
  tail = () => {
    return this.tailNode;
  };
  head = () => {
    return this.headNode;
  };
  size = () => {
    let ct = 0;
    let cur = this.head();
    while (cur !== null) {
      cur = cur.nextNode;
      ct++;
    }
    return ct;
  };
  at = index => {
    let ct = 0;
    let cur = this.head();
    while (cur !== null) {
      cur = cur.nextNode;
      ct++;
      if (ct === index) {
        return cur;
      }
    }
    return null;
  };
  insertAt = (value, index) => {
    let ct = 0;
    let cur = this.head(),
      preCur = null;
    while (cur !== null && ct < index) {
      preCur = cur;
      cur = cur.nextNode;
      ct++;
      if (ct === index) {
        const newNode = new Node(value);
        preCur.nextNode = newNode;
        newNode.nextNode = cur;
        break;
      }
    }
  };
  removeAt = index => {
    let curIndex = 0;
    let cur = this.head(),
      preCur = null;
    while (cur !== null) {
      if (curIndex === index) {
        if (preCur === null) {
          this.headNode = cur.nextNode;
        } else {
          preCur.nextNode = cur.nextNode;
        }
        break;
      }
      preCur = cur;
      cur = cur.nextNode;
      curIndex++;
    }
    return null;
  };
  pop = () => {
    let cur = this.head(),
      preCur = null,
      tailNode = this.tail();
    while (cur !== tailNode) {
      preCur = cur;
      cur = cur.nextNode;
    }
    preCur.nextNode = null;
    this.tailNode = preCur;
  };
  contains = value => {
    let cur = this.head();
    while (cur !== null) {
      if (cur.value === value) {
        return true;
      }
      cur = cur.nextNode;
    }
    return false;
  };
  find = value => {
    let cur = this.head();
    let index = 0;
    while (cur !== null) {
      if (cur.value === value) {
        return index;
      }
      index++;
      cur = cur.nextNode;
    }
    return null;
  };
  toString = () => {
    let res = '';
    let cur = this.head();
    while (cur !== null) {
      res += `( ${cur.value} ) -> `;
      cur = cur.nextNode;
    }
    return (res += 'null');
  };
}

class Node {
  constructor(value) {
    this.nextNode = null;
    this.value = value;
  }
}

// Initialize test counters
let passedTests = 0;
let totalTests = 0;

function recordTestResult(condition, expected, actual) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log('Passed');
  } else {
    console.log(`Failed - Expected: ${expected}, Actual: ${actual}`);
  }
}

// Initialize an empty linked list for testing
const linkedList = new LinkedList();

// Test: append(value)
console.log('Test append:');
linkedList.append(10);
recordTestResult(linkedList.tail().value === 10, 10, linkedList.tail().value);

// Test: prepend(value)
console.log('Test prepend:');
linkedList.prepend(5);
recordTestResult(linkedList.head().value === 5, 5, linkedList.head().value);

// Test: size
console.log('Test size:');
recordTestResult(linkedList.size() === 2, 2, linkedList.size());

// Test: head
console.log('Test head:');
recordTestResult(linkedList.head().value === 5, 5, linkedList.head().value);

// Test: tail
console.log('Test tail:');
recordTestResult(linkedList.tail().value === 10, 10, linkedList.tail().value);

// Test: at(index)
console.log('Test at:');
recordTestResult(linkedList.at(1).value === 10, 10, linkedList.at(1).value);

// Test: pop
console.log('Test pop:');
linkedList.pop();
recordTestResult(
  linkedList.tail().value === 5 && linkedList.size() === 1,
  true,
  linkedList.tail().value === 5 && linkedList.size() === 1
);

// Test: contains(value)
console.log('Test contains:');
recordTestResult(linkedList.contains(5), true, linkedList.contains(5));
recordTestResult(!linkedList.contains(10), true, !linkedList.contains(10));

// Test: find(value)
console.log('Test find:');
recordTestResult(linkedList.find(5) === 0, 0, linkedList.find(5));
recordTestResult(linkedList.find(10) === null, null, linkedList.find(10));

// Test: toString
console.log('Test toString:');
recordTestResult(
  linkedList.toString() === '( 5 ) -> null',
  '( 5 ) -> null',
  linkedList.toString()
);

// Test: insertAt(value, index)
console.log('Test insertAt:');
linkedList.insertAt(7, 1);
recordTestResult(
  linkedList.at(1).value === 7 && linkedList.size() === 2,
  true,
  linkedList.at(1).value === 7 && linkedList.size() === 2
);

// Test: removeAt(index)
console.log('Test removeAt:');
linkedList.removeAt(1);
recordTestResult(
  linkedList.find(7) === null && linkedList.size() === 1,
  true,
  linkedList.find(7) === null && linkedList.size() === 1
);

// Additional tests for append and prepend
console.log('Test append with multiple elements:');
linkedList.append(20);
linkedList.append(30);
recordTestResult(
  linkedList.toString() === '( 5 ) -> ( 20 ) -> ( 30 ) -> null',
  '( 5 ) -> ( 20 ) -> ( 30 ) -> null',
  linkedList.toString()
);

console.log('Test prepend with multiple elements:');
linkedList.prepend(1);
linkedList.prepend(0);
recordTestResult(
  linkedList.toString() ===
    '( 0 ) -> ( 1 ) -> ( 5 ) -> ( 20 ) -> ( 30 ) -> null',
  '( 0 ) -> ( 1 ) -> ( 5 ) -> ( 20 ) -> ( 30 ) -> null',
  linkedList.toString()
);

// Test edge cases
console.log('Test removeAt with invalid index:');
recordTestResult(
  linkedList.removeAt(100) === null,
  null,
  linkedList.removeAt(100)
);

console.log('Test at with invalid index:');
recordTestResult(linkedList.at(-1) === null, null, linkedList.at(-1));

console.log('Test behavior of head, tail, and at on an empty list:');
const linkedList2 = new LinkedList(); // Reset the list to be empty
recordTestResult(
  linkedList2.head() === null &&
    linkedList2.tail() === null &&
    linkedList2.at(0) === null,
  true,
  linkedList2.head() === null &&
    linkedList2.tail() === null &&
    linkedList2.at(0) === null
);

// Test toString more extensively
console.log('Test toString with an empty list:');
recordTestResult(
  linkedList2.toString() === 'null',
  'null',
  linkedList2.toString()
);

linkedList2.append(40);
console.log('Test toString after append:');
recordTestResult(
  linkedList2.toString() === '( 40 ) -> null',
  '( 40 ) -> null',
  linkedList2.toString()
);

linkedList2.append(50);
linkedList2.removeAt(0);
console.log('Test toString after append and removeAt:');
recordTestResult(
  linkedList2.toString() === '( 50 ) -> null',
  '( 50 ) -> null',
  linkedList2.toString()
);

// Function to summarize test results
function summarizeTestResults() {
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed Tests: ${passedTests}`);
  console.log(`Failed Tests: ${totalTests - passedTests}`);
}

// At the end of all tests
summarizeTestResults();

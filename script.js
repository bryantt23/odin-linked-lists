class LinkedList {
  constructor() {
    const dummy = new Node(-1);
    this.headNode = dummy;
    this.tailNode = dummy;
  }
  append = value => {
    const newNode = new Node(value);
    this.tailNode.nextNode = newNode;
    this.tailNode = newNode;
  };
  prepend = value => {
    const newNode = new Node(value);
    newNode.nextNode = this.headNode.nextNode;
    this.headNode = newNode;
  };
  tail = () => {
    return this.tailNode;
  };
  head = () => {
    return this.headNode;
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

function recordTestResult(condition) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log('Passed');
  } else {
    console.log('Failed');
  }
}

// Initialize an empty linked list for testing
const linkedList = new LinkedList();

// Test: append(value)
console.log('Test append:');
linkedList.append(10);
recordTestResult(linkedList.tail().value === 10);

// Test: prepend(value)
console.log('Test prepend:');
linkedList.prepend(5);
recordTestResult(linkedList.head().value === 5);

// Test: size
console.log('Test size:');
recordTestResult(linkedList.size() === 2);

// Test: head
console.log('Test head:');
recordTestResult(linkedList.head().value === 5);

// Test: tail
console.log('Test tail:');
recordTestResult(linkedList.tail().value === 10);

// Test: at(index)
console.log('Test at:');
recordTestResult(linkedList.at(1).value === 10);

// Test: pop
console.log('Test pop:');
linkedList.pop();
recordTestResult(linkedList.tail().value === 5 && linkedList.size() === 1);

// Test: contains(value)
console.log('Test contains:');
recordTestResult(linkedList.contains(5));
recordTestResult(!linkedList.contains(10));

// Test: find(value)
console.log('Test find:');
recordTestResult(linkedList.find(5) === 0);
recordTestResult(linkedList.find(10) === null);

// Test: toString
console.log('Test toString:');
recordTestResult(linkedList.toString() === '( 5 ) -> null');

// Test: insertAt(value, index)
console.log('Test insertAt:');
linkedList.insertAt(7, 1);
recordTestResult(linkedList.at(1).value === 7 && linkedList.size() === 2);

// Test: removeAt(index)
console.log('Test removeAt:');
linkedList.removeAt(1);
recordTestResult(linkedList.find(7) === null && linkedList.size() === 1);

// Additional tests for append and prepend
console.log('Test append with multiple elements:');
linkedList.append(20);
linkedList.append(30);
recordTestResult(linkedList.toString() === '( 5 ) -> ( 20 ) -> ( 30 ) -> null');

console.log('Test prepend with multiple elements:');
linkedList.prepend(1);
linkedList.prepend(0);
recordTestResult(
  linkedList.toString() ===
    '( 0 ) -> ( 1 ) -> ( 5 ) -> ( 20 ) -> ( 30 ) -> null'
);

// Test edge cases
console.log('Test removeAt with invalid index:');
recordTestResult(linkedList.removeAt(100) === null); // Assuming removeAt returns null for invalid index

console.log('Test at with invalid index:');
recordTestResult(linkedList.at(-1) === null); // Assuming at returns null for invalid index

console.log('Test behavior of head, tail, and at on an empty list:');
linkedList = new LinkedList(); // Reset the list to be empty
recordTestResult(
  linkedList.head() === null &&
    linkedList.tail() === null &&
    linkedList.at(0) === null
);

// Test toString more extensively
console.log('Test toString with an empty list:');
recordTestResult(linkedList.toString() === 'null'); // Assuming toString returns 'null' for an empty list

linkedList.append(40);
console.log('Test toString after append:');
recordTestResult(linkedList.toString() === '( 40 ) -> null');

linkedList.append(50);
linkedList.removeAt(0);
console.log('Test toString after append and removeAt:');
recordTestResult(linkedList.toString() === '( 50 ) -> null');

// Function to summarize test results
function summarizeTestResults() {
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed Tests: ${passedTests}`);
  console.log(`Failed Tests: ${totalTests - passedTests}`);
}

// At the end of all tests
summarizeTestResults();

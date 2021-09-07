
const seatTypes = {
  1: 'aisle',
  2: 'window',
  3: 'middle'
};

const Node = class {
  constructor(boxIndex, row, column, type) {
    this.index = [boxIndex, row, column];
    this.type = seatTypes[type];
    this.rowIndex = row;
    this.boxIndex = boxIndex;
    this.filled = false;
    this.position = null;
  }
}



export const fillSeats = (head, count, types = seatTypes) => {
  let type = 1; // starting from aisle seats
  let position = 1;
  while (position <= count && type < 4) {
    let node = head;
    while (node && position <= count) {
      if (node.type === types[type]) {
        node.position = position++;
        node.filled = true;
      }
      node = node.right;
    }
    ++type; // moving to next window || middle seats
  }
  return head;
}


export const contructNodes = (boxes, maxBoxIndex, boxIndex, row, column, maxRow, maxColumn) => {
  if (row > maxRow) {

    if (boxIndex === maxBoxIndex) {
      // reached most row and most box
      return null;
    }

    // move to next row
    return contructNodes(boxes, maxBoxIndex, boxIndex + 1, row, 0, boxes[boxIndex + 1][1] - 1, boxes[boxIndex + 1][0] - 1);
  }
  // when reached max column of current box
  if (column > maxColumn) {

    if (boxIndex === maxBoxIndex) {
      // move to first box
      return contructNodes(boxes, maxBoxIndex, 0, row + 1, 0, boxes[0][1] - 1, boxes[0][0] - 1);
    }

    // move to next box
    return contructNodes(boxes, maxBoxIndex, boxIndex + 1, row, 0, boxes[boxIndex + 1][1] - 1, boxes[boxIndex + 1][0] - 1);
  }

  let type = 3;
  if ((boxIndex === 0 && column === 0) || (boxIndex === maxBoxIndex && column === maxColumn)) {
    type = 2;
  }
  else if (column === maxColumn || column === 0) {
    type = 1;
  }
  const node = new Node(boxIndex, row, column, type);
  node.right = contructNodes(boxes, maxBoxIndex, boxIndex, row, column + 1, maxRow, maxColumn);
  return node;
}


export const getNodesByBox = (node) => {
  let nodes = [];
  while(node) {
    if(!nodes[node.boxIndex]) {
      nodes[node.boxIndex] = [];
    }
    nodes[node.boxIndex].push(node);
    node = node.right;
  }
  return nodes;
}

export const groupByRow = (boxSeats) => {
  let seats = [];
  boxSeats.forEach(seat => {
    if(!seats[seat.rowIndex]) {
      seats[seat.rowIndex] = [];
    }
    seats[seat.rowIndex].push(seat);
  })
  return seats;
}

export const convertInputTo2Darray = (compartments) => {
  return compartments.map(comp => [comp.columns, comp.rows]);
};

export const getSeatsByGroup = (nodes) => {
  
}
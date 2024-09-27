import { GraphData } from "../types/type";

export const jsondata1: GraphData[] = [
  {
    title: "Employee Read Sequence",
    nodes: [
      {
        type: "user",
        name: "Desktop Client",
        details: {
          browser: "Chrome",
          "anonymous-user": true,
        },
        "correlation-id": "123456",
        next: "2",
        id: "1",
      },
      {
        type: "api",
        name: "POST /emp",
        details: {
          method: "POST",
          component: "API gateway",
          endpoint: "https://www.tachyonsys.com.au/emp",
          access: "public",
        },
        "correlation-id": "123456",
        next: "3",
        prev: "1",
        id: "2",
      },
      {
        type: "function",
        name: "createEmployee",
        details: {
          method: "createEmployee",
          Parameters: "{name, dob, contact, address}",
          return: "id",
        },
        "correlation-id": "123456",
        next: "4",
        prev: "2",
        id: "3",
      },
      {
        type: "database",
        name: "DynamoDB",
        details: {
          type: "NOSQL",
          Provider: "AWS",
          endpoint: "https://aws.com/dynamodb/a72b898146ca576",
          table: "employees",
        },
        "correlation-id": "123456",
        prev: "3",
        id: "4",
      },
    ],
  },
];

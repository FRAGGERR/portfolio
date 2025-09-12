---
title: Kickstart Java - Syntax & Fundamentals
description: A quick, beginner-friendly guide to Java basics and core syntax in one shot.
date: 2024-01-28
draft: false
slug: /pensieve/Java
tags:
  - Java
  - Syntax
  - Fundamentals
---

# Java : Basics and Syntax

**Our First java code :**

```java
public class helloworld {

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

## Data Types in Java

### **Primitive Data Types:**

1. **Integral Types:**
   - **`byte`**: 8-bit signed integer.
   - **`short`**: 16-bit signed integer.
   - **`int`**: 32-bit signed integer.
   - **`long`**: 64-bit signed integer.
2. **Floating-Point Types:**
   - **`float`**: 32-bit IEEE 754 floating-point.
   - **`double`**: 64-bit IEEE 754 floating-point.
3. **Character Type:**
   - **`char`**: 16-bit Unicode character.
4. **Boolean Type:**
   - **`boolean`**: Represents true or false values.

   ```java
   public class helloworld {

       public static void main(String[] args) {
           byte age = 28; // byte is 1 byte
           short age2 = 72; // short is 2 bytes
           int phone = 123456789; // int is 4 bytes
           long phone2 = 1234567890L;// long is 8 bytes
           float height = 3.14f; // float is 4 bytes
           double lenght = 78.09758; // double is 8 bytes
           char letter = 'a'; // char is 2 bytes
           boolean isAdult = false; // boolean is 1 byte
       }
   }
   ```

   **_Some extra and funky code-snippet_**

   ```java
   public class helloworld {

       public static void main(String[] args) {
           String name = "Hardik";
           System.out.println("The no. of characters in " + name + " is " + name.length() + ".");
       }
   }
   ```

   ### Strings in Java

   The strings in the java are immutable.
   - Replacement Method

   ```java
   public class helloworld {

       public static void main(String[] args) {
           String name = "hardik";
           String name2 = name.replace("hardik", "hardick");
           System.out.println(name2);
           System.out.println(name);
       }
   }
   ```

   - Substring Method

   ```java
   public class helloworld {

       public static void main(String[] args) {
           String name = "Hardik and Janenie";
           System.out.println(name.substring(0, 15));
       }
   }
   ```

   ## Arrays in Java

   In Java, you can create an array using the following syntax:

   ```java
   dataType[] arrayName = new dataType[arraySize];

   // Example: Creating an array of integers
   int[] intArray = new int[5];

   // Example: Creating an array of strings
   String[] stringArray = new String[3];
   ```

   Here's a breakdown of the syntax:
   - **`dataType`**: The type of elements that the array will hold.
   - **`arrayName`**: The name you give to the array variable.
   - **`new dataType[arraySize]`**: Allocates memory for the array. **`arraySize`** specifies the number of elements in the array.

   You can also initialize the array with values at the time of creation:

   ```java
   dataType[] arrayName = {value1, value2, ..., valueN};

   // Example: Initializing an array of integers
   int[] intArray = {1, 2, 3, 4, 5};

   // Example: Initializing an array of strings
   String[] stringArray = {"apple", "banana", "orange"};

   ```

   - Array creation and output generation by the given array

   ```java
   public class helloworld {

       public static void main(String[] args) {

           int[] marks = new int[3];
           marks[0] = 40;
           marks[1] = 79;
           marks[2] = 99;

           //First way to print array
           System.out.println(marks[0]);
           System.out.println(marks[1]);
           System.out.println(marks[2]);

           //Second way to print array
           for (int i = 0; i < 3; i++){
               System.out.println(marks[i]);
           }
       }
   }
   ```

   - Length and sorting of the array

   ```java
   import java.util.Arrays;
   public class helloworld {

       public static void main(String[] args) {

           int[] marks = new int[3];
           marks[0] = 89;
           marks[1] = 99;
           marks[2] = 67;

           for (int i = 0; i < 3; i++){
               System.out.println(marks[i]);
           }
           //Lenght of the array.
           System.out.println("The lenght of the array is : " + marks.length);

           //sorting of the array.
           Arrays.sort(marks);
           for (int i = 0; i < 3; i++){
               System.out.println("Sorted array : " + marks[i]);
           }

       }
   }
   ```

   - Type Casting : just write what datatype we are going to replace.

   ```java
   public class helloworld {

       public static void main(String[] args) {

           //implicit type casting
           double price = 100.000;
           int quantity = 10;
           double total = price * quantity;
           System.out.println(total);

           //explicit type casting
           int p = 100;
           int fp = p + (int) 12.03;
           System.out.println(fp);
       }
   }
   ```

   - Scanning in Java
     - Integer input
       ```java
       import java.util.Scanner;

       public class helloworld {

           public static void main(String[] args) {
       // At first we have to create a object for int.
               Scanner sc = new Scanner(System.in);
               System.out.println("Enter First digit : ");
               int a = sc.nextInt(); // calling the int obj 'sc' and assigning it to variable.
               System.out.println("Enter second digit : ");
               int b = sc.nextInt();// again calling the onj 'sc' for assigning to seconf variable.
               System.out.println("Sum of the inputs is : " + (a + b));
           }
       }
       ```
     - Float Input
     ```java
     import java.util.Scanner;

     public class helloworld {

         public static void main(String[] args) {
             Scanner sc  = new Scanner(System.in);
             System.out.println("Enter your height : ");
             float height = sc.nextFloat(); // here we've to use nextFloat().
             System.out.println(height);
         }
     }
     ```

     - String Input
     ```java
     import java.util.Scanner;

     public class helloworld {

         public static void main(String[] args) {
             Scanner sc = new Scanner(System.in);
             String name = sc.next(); // next() will take int only single word.
             String address = sc.nextLine();//nextLine() will take int a whole line.
             System.out.println("Hello " + name);
             System.out.println("Your address is " + address);
         }
     }
     ```

## Condition Statement

- If statements

```java
import java.util.Scanner;

public class helloworld {

    public static void main(String[] args) {
        int x;
        Scanner sc = new Scanner(System.in);
        x = sc.nextInt();

        if (x <= 18) {
            System.out.println("You are young");
        }
    }
}
```

- If - Else Statements

```java
import java.util.Scanner;

public class helloworld {

    public static void main(String[] args) {
        int x;
        Scanner sc = new Scanner(System.in);
        x = sc.nextInt();

        if (x <= 18) {
            System.out.println("You are young");
        }
        else {
            System.out.println("You are old");
        }
    }
}
```

- Else if Statements

```java
import java.util.Scanner;

public class helloworld {

    public static void main(String[] args) {
        int x;
        Scanner sc = new Scanner(System.in);
        x = sc.nextInt();

        if (x <= 12) {
            System.out.println("You are young");
        } else if (x <= 18) {
            System.out.println("You are a teenager");
        } else {
            System.out.println("You are old");
        }
    }
}
```

## Looping statements

- For Loop

```java
public class helloworld {
    public static void main(String[] args) {
        for (int i = 100; i > 0; i--){
            System.out.println(i);
        }
    }
}
```

- While Loop

```java
public class helloworld {
    public static void main(String[] args) {
        int i = 100;
        while(i >= 0){
            System.out.println(i--);
        }
    }
}
```

- Do-While Loop

```java
public class helloworld {
    public static void main(String[] args) {
        int i = 100;
        do{
            System.out.println(i--);
        }while (i >= 0);
    }
}
```

## Break and Continue Statement

```java
public class helloworld {
    public static void main(String[] args) {
        int i = 0;
        while (true){
            System.out.println(i);
            i++;
            if (i > 5){
                break;
            }
        }
    }
}
```

```java
public class helloworld {
    public static void main(String[] args) {
        int i = 0;
        while (true){
            if (i == 3){
                i++;
                continue;// Because of this we skipped 3
            }
            System.out.println(i);
            i++;
            if (i > 5){
                break;
            }
        }
    }
}
```

## Exception Handling

```java
public class helloworld {
    public static void main(String[] args) {
        int i, j, k = 0;
        i = 8;
        j = 0;
        try {
            k = i / j;
        } catch (Exception e) {
            System.out.println(e);
        }
        System.out.println(k);
    }
}

//Still we're getting the output that is : 0
```

## Functions In Java

```java
public class helloworld {

    public static void printJava(){
        System.out.println("Hello Java");
    }
    public static void main(String[] args) {
        printJava();
        printJava();
        printJava();
        printJava();
    }
}
```

```java
public static void printName(String name){

        System.out.println("Hello " + name);
    }
    public static void main(String[] args) {
        printName("Hardik");
        printName("Janenie");
    }
}
```

```java
public class helloworld {

    public static int printSum(int a, int b){ //here we use int at the place of void
        return a + b;
    }
    public static void main(String[] args) {
        int sum = printSum(5, 9);
        System.out.println(sum);
    }
}
```

## Mini Project

```Java
import java.util.Scanner;

public class helloworld {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int myNumber = (int) (Math.random() * 100); // Math.random will generate the value between 0.0 and 1.0
        int userNumber = 0;
        do {
            System.out.println("Guess a number between 0 and 100 : ");
            userNumber = sc.nextInt();

            if (userNumber == myNumber) {
                System.out.println("HURRY... YOU GOT IT!");
            } else if (userNumber > myNumber) {
                System.out.println("Your number is higher");
            } else {
                System.out.println("Your number is lower");
            }
        } while (userNumber != myNumber);
        System.out.print("Thanks for playing, My number was : ");
        System.out.println(myNumber);
    }
}
```

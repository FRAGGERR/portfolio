---
title: Object Oriented Programming in Java
description: Dive into the fundamentals of Object-Oriented Programming (OOP) in Java.
date: 2024-02-15
draft: false
slug: /pensieve/Java_OOP
tags:
  - Java
  - Object-Oriented Programming
  - Fundamentals
---

# Java : Object-Oriented Programming

Dive into the fundamentals of Object-Oriented Programming (OOP) in Java. This article breaks down the core concepts—like classes, objects, inheritance, polymorphism, and encapsulation—while guiding you through Java syntax step by step. Perfect for beginners who want to build a strong foundation in Java programming and understand how OOP powers real-world applications.

The four basic fundamentals concepts of Object oriented programming are on the following ways :

- Polymorphism
- Encapsulation
- Inheritance
- Abstraction

Here is one example of creating a class in java

```java
class Pen {
    String color;
    String brand;
    String type;
    int price;

    public void write() {
        System.out.println("Here we worte somthing about the pen.");
    }
}
public class oops {
    public static void main(String[] args) {
        Pen Trimax = new Pen();
        Trimax.color = "Blue";
        Trimax.brand = "Reynolds";
        Trimax.type = "Gel pen";
        Trimax.price = 50;
        Trimax.write();
        System.out.println(Trimax.color + " " + Trimax.brand + " " + Trimax.type + " " + Trimax.price);
    }
}
```

Another way to print the values of the class by using **THIS** function.

```java
class Pen {
    String color;
    String brand;
    String type;
    int price;

    public void write() {
        System.out.println("Here we worte somthing about the pen.");
    }
    public void printColor(){
        System.out.println(this.color);
    }
}

public class oops {
    public static void main(String[] args) {

        Pen Trimax = new Pen();//Our First pen
        Trimax.color = "Blue";
        Trimax.brand = "Reynolds";
        Trimax.type = "Gel pen";
        Trimax.price = 50;
        Trimax.write();
        Trimax.printColor();//This will give ous the color

        Pen Fountain = new Pen(); //Our Second pen
        Fountain.color = "Black";
        Fountain.brand = "Cello";
        Fountain.type = "Ink pen";
        Fountain.price = 40;
        Fountain.printColor();//This will give ous the color
    }
}
```

Same Logic but this time we’re using Constructor :

```java
class Pen{
    String color;
    String brand;
    String type;
    int price;

    //Constructor
    public Pen (String color, String brand, String type, int price){
        this.color = color;
        this.brand = brand;
        this.type = type;
        this.price = price;
    }
    public void printDetails(){
        System.out.println("Color : " + color);
        System.out.println("Brand : " + brand);
        System.out.println("Type : " + type);
        System.out.println("Price : " + price);
    }
}
public class oops {
    public static void main(String[] args) {
         Pen trimax = new Pen("Blue", "Reynolds", "Gel pen", 50);
         trimax.printDetails();

         Pen fountain = new Pen("Black", "Fountain", "Ink pen", 40);
         fountain.printDetails();

    }
}
```

# Constructors in Java

### **What is a Constructor?**

- A constructor is a special type of method in Java that is used to initialize objects.
- It is called when an object is created using the **`new`** keyword.

```java
public class MyClass {
    // Default Constructor
    public MyClass() {
        // Initialization code
    }

    // Parameterized Constructor
    public MyClass(int value) {
        // Initialization code with a parameter
    }
}
```

### **Constructor Rules:**

- The constructor name must be the same as the class name.
- Constructors do not have a return type, not even **`void`**.
- They are automatically called when an object is created.
- A class can have multiple constructors (overloading).

### **Types of Constructors:**

- **Default Constructor:**
  - Provided by the compiler if no constructor is explicitly defined.
  - Initialises instance variables to their default values.
  ```java
  class Student {
      String name;
      int age;

      public void printInfo(){
          System.out.println(this.name);
          System.out.println(this.age);
      }
      Student(){ //here we created student constructor.
          System.out.println("constructor called.");
      }

  }
  public class oops {
      public static void main(String[] args) {
          Student s1 = new Student();
          s1.name = "Hardik";
          s1.age = 20;
          s1.printInfo();
      }
  }
  //output:
  //constructor called.
  //Hardik
  //20
  ```
- **Parameterised Constructor:**
  - Accepts parameters to initialise instance variables with specified values.
  - Provides more flexibility in object creation.
  ```java
  class Student {
      String name;
      int age;

      public void printInfo() {
          System.out.println(this.name);
          System.out.println(this.age);
      }

      Student(String name, int age) {
          System.out.println("constructor called.");
          this.name = name;
          this.age = age;
      }

  }

  public class oops {
      public static void main(String[] args) {
          Student s1 = new Student("Hardik", 20);
          s1.printInfo();
      }
  }
  //output:
  //constructor called.
  //Hardik
  //20
  ```

### **Constructor Overloading:**

- A class can have multiple constructors with different parameter lists.
- Allows creating objects with different sets of initial values.

### Copy Constructor

```java
class Student {
    String name;
    int age;

    Student (String name, int age){
        this.name = name;
        this.age = age;
    }
    Student (Student otherStudent){
        this.name = otherStudent.name;
        this.age = otherStudent.age;
    }public void printInfo(){
        System.out.println(this.name);
        System.out.println(this.age);
    }
}
public class oops {
    public static void main(String[] args) {
        Student s1 = new Student("Hardik", 20);
        Student s2 = new Student(s1);
        s1.printInfo();
    }
}
//Output
//Hardik
//20
```

# Polymorphism in Java

The term ‘Polymorphism’ is a greek term which means ‘many forms’

### Types of Polymorphism in Java are

1. Compile-Time (Static) Polymorphism
2. Run-Time (Dynamic) Polymorphism

### Compile-Time Polymorphism

Compile-time polymorphism is achieved through method overloading. Method overloading allows a class to have multiple methods with the same name but different parameters.

Basically we’re performing function overloading in this.

What is Function overloading? **Function overloading is a feature in oops that allows a class to have a multiple methods with the same name of the class but the different parameter list.**

```java
class Student {
    String name;
    int age;

    public void printInfo(String name){
        System.out.println(name);
    }
    public void printInfo(int age){
        System.out.println(age);
    }
    public void printInfo(String name, int age){
        System.out.println(name + " " + age);
    }
}

public class oops{
    public static void main(String[] args) {

        Student s1 = new Student();
        s1.name =  "Hardik";
        s1.age = 20;

        s1.printInfo(s1.name);
        s1.printInfo(s1.name, s1.age);
    }
}
//Output
//Hardik
//Hardik 20
```

### Run-Time Polymorphism

### **Benefits of Polymorphism:**

- Code Reusability: Polymorphism promotes code reuse through method overriding and interfaces.
- Flexibility: Objects of different types can be treated as objects of a common type, providing flexibility in design.

# Inheritance in Java

To be continued in sometime!.

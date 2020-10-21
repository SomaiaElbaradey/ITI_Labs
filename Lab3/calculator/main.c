#include <stdio.h>
#include <stdlib.h>
int Add(int,int);
int Sub(int,int);
int Multi(int,int);
int Divide(int,int);
int result;
int main()
{
    int number1, number2, result;
    char myOperator = '+' || '-' || '*' || '/';
    char flag = 'Y';
    while(flag=='Y' || flag=='y'){
        printf("Please Enter Your First Number \n");
        scanf("%i",&number1);
        _flushall();
        printf("Please Enter Your Second Number \n");
        scanf("%i",&number2);
        _flushall();
        printf("Please Enter The Operator \n");
        myOperator = getche();
        if (myOperator){
            system("cls");
            if (myOperator == '+'){
                result = Add(number1,number2);
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);
            }
            else if (myOperator == '-'){
                result = Sub(number1,number2);
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);

            }
            else if (myOperator == '*'){
                result = Multi(number1,number2);
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);

            }
            else if (myOperator == '/'){
                while (number2 == 0){
                    printf("You can't divide on zero, please re-enter your second number \n");
                    scanf("%i",&number2);
                    _flushall();
                }
                system("cls");
                result = Divide(number1,number2);
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);

            }
        }
        printf("Do you wanna continue? enter Y for Yes or N for No \n");
        scanf("%c",&flag);
        _flushall();
    }

    return 0;
}
int Add(int num1, int num2){
    return result = num1+num2;
}
int Sub(int num1, int num2){
    return result = num1-num2;
}
int Multi(int num1, int num2){
    return result = num1*num2;
}
int Divide(int num1, int num2){
    return result = num1/num2;
}

#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

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
                result = number1+number2;
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);
            }
            else if (myOperator == '-'){
                result = number1-number2;
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);

            }
            else if (myOperator == '*'){
                result = number1*number2;
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);

            }
            else if (myOperator == '/'){
                while (number2 == 0){
                    printf("You can't divide on zero, please re-enter your second number \n");
                    scanf("%i",&number2);
                    _flushall();
                }
                system("cls");
                result = number1/number2;
                printf("%d %c %d = %d \n", number1, myOperator, number2, result);

            }
        }
        printf("Do you wanna continue? enter Y for Yes or N for No \n");
        scanf("%c",&flag);
        _flushall();
    }



    return 0;
}

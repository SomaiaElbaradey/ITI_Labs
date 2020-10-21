#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

int main()
{
    char myChar;
    printf(" a. good morning \n b. good afternoon \n c. good bye \n");
    do {
        printf("please enter character \n");
        myChar = getche();
        system("cls");
        switch(myChar){
            case 'a':
            case 'A':
                printf("good morning \n");
                break;
            case 'b':
            case 'B':
                printf("good afternoon \n");
                break;
            default:
                printf("not valid \n");
                break;
        }
    } while(myChar!='c');
    if (myChar=='c'|| myChar=='C'){
        system("cls");
        printf("good bye \n");
    }

    return 0;
}

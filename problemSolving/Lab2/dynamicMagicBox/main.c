#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

void gotoxy( int column, int line )
{
    COORD coord;
    coord.X = column;
    coord.Y = line;
    SetConsoleCursorPosition(GetStdHandle( STD_OUTPUT_HANDLE ),coord);
}

int main()
{

    int num, size;
    do{
        printf("please enter your magic box size \n");
        scanf("%d", &size);
        int col=(size/2)+1, row=1;
        if(size&1){
            for(num=1; num<=(size*size); num++){
            gotoxy(col*5, row*5);
            printf("%i", num);
            if (num%size !=0){
                row--; col--;
                if (row==0){row= size;}
                if (col==0) {col=size;}
            }
            else{
                row++;
            }
        }
        }
    } while (!(size&1));


    return 0;
}


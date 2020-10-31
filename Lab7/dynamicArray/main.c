#include <stdio.h>
#include <stdlib.h>

int main()
{
    int row,col;
    int** ptr;
    printf("please enter the number of rows: ");
    scanf("%d",&row);
    printf("please enter the number of columns: ");
    scanf("%d",&col);
    ptr = malloc(row*sizeof(int*));
    for(int i=0;i<row;i++){
        ptr[i]=malloc(col*sizeof(int));
    }
    for(int i=0;i<row;i++){
        printf("please enter your %d row numbers \n", i+1);
        for(int j=0;j<col;j++){
            printf("please enter your numbers \n");
            scanf("%d",&ptr[i][j]);
        }
        printf("\n");
    }
    system("cls");
    printf("your matrix is: \n");
    for (int i=0; i<row; i++)
    {
        for (int j=0; j<col; j++)
        {
            printf("%d\t",ptr[i][j]);
        }
        printf("\n");
    }
    return 0;
}

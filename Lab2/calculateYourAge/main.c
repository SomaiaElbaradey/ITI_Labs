#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

int main()
{
    int todayDay = 19;
    int todayMonth = 10;
    int todayYear = 2020;
    int birthDay, birthMonth, birthYear, agedDay, agedMonth, agedYear;

    // enter a valid year, month
    printf("please enter your birth year \n");
    scanf("%d",&birthYear);
    _flushall();
    while (birthYear < 1 || birthYear > 2020){
        printf("you entered wrong birth year!, please re-enter your birth year \n");
        scanf("%i",&birthYear);
        _flushall();
    }
    printf("please enter your birth month \n");
    scanf("%d",&birthMonth);
    _flushall();
    while (birthMonth < 1 || birthMonth > 12){
        printf("you entered wrong birth month!, please re-enter your birth month \n");
        scanf("%i",&birthMonth);
        _flushall();
    }

    // enter a valid day
    printf("please enter your birth Day \n");
    scanf("%d",&birthDay);
    _flushall();

    if (birthMonth == 1 || birthMonth ==3 || birthMonth ==5 || birthMonth ==7 || birthMonth ==8 || birthMonth ==10 || birthMonth ==12){
        while (birthDay < 1 || birthDay > 31){
        printf("you entered wrong birth Day!, please re-enter your birth Day a\n");
        scanf("%i",&birthDay);
        _flushall();
        }
    }
    else if (birthMonth == 4 || birthMonth ==6 || birthMonth ==9 || birthMonth ==11 ) {
        while (birthDay < 1 || birthDay > 30){
        printf("you entered wrong birth Day!, please re-enter your birth Day b\n");
        scanf("%i",&birthDay);
        _flushall();
        }
    }
    else if (birthMonth == 2 ){
        if (birthYear%4 == 0 ){
            if (birthDay < 1 || birthDay > 29){
            printf("you entered wrong birth Day!, please re-enter your birth Day c\n");
            scanf("%i",&birthDay);
            _flushall();
            }
        }
        else if (birthDay < 1 || birthDay > 28){
            printf("you entered wrong birth Day!, please re-enter your birth Day d\n");
            scanf("%i",&birthDay);
            _flushall();
        }
    }

    //the result
    agedYear = todayYear - birthYear;
    if (todayMonth<birthMonth){
        agedYear--;
        agedMonth = (todayMonth+12) - birthMonth;
        agedDay = todayDay - birthDay;
    }
    if (todayDay<birthDay){
        agedMonth = todayMonth - birthMonth;
        agedMonth--;
        agedDay = (todayDay+30) - birthDay;
    }
    else{
        agedMonth = todayMonth - birthMonth;
        agedDay = todayDay - birthDay;
    }
    system("cls");
    printf("you are %d days and %d months and %d years old \n", agedDay, agedMonth, agedYear);


    return 0;
}

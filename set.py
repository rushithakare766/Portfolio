list1=list(map(int,input().split()))
# ans=70 
result=[]
for i in range(0,len(list1)):
    for j in range(i,len(list1)):
        if list1[i]+list1[j]==70:
            result.append(list1[i])
            result.append(list1[j])

ans=set(result)
ans1=list(ans)
result1=[]
for i in range(0,len(ans1)):
    for j in range(i,len(ans1)):
        if ans1[i]+ans1[j]==70:
            result1.append(ans1[i])
            result1.append(ans1[j])
            print(ans1[i],ans1[j])

print(result1)


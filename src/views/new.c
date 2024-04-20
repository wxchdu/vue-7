#define INFINITY 2147483647
void MATRIX_CHAIN_ORDER(int p[],int length)//用于计算m和s的函数
{
	int n;
	n=length-1; 
	int i,j,k,q,l;
	for(i=1;i<=n;i++) 
	{
		m[i][i]=0;//只有一个矩阵的时候乘法代价为0
	} 
	for(l=2;l<=n;l++)//求解的顺序是自底向上的，先从规模最小的2个矩阵链求起一直求到矩阵链长度为n为止
	{
		for(i=1;i<=n-l+1;i++)//i用于决定一个矩阵链的起点，这个起点的范围就在1~n-l+1（总长度-当前长度+当前长度中多减的代表最靠后的起点的1）中间
		{
			j=i+l-1;//j决定一个矩阵链的终点，终点就在i+j-1（起点+长度-长度中起点的重复计数）
			m[i][j]=INFINITY;
			for(k=i;k<j;k++)//在i和j中寻找k，之后就和上面的思路是一样的了
			{
				q=m[i][k]+m[k+1][j]+p[i-1]*p[k]*p[j];
				if(q<m[i][j])
				{
					m[i][j]=q;
					s[i][j]=k;
				}
			}
		}
	}
}
void PRINT_OPTIML_PARENS(int i,int j)//用于打印加括号方式的函数
{
	if(i==j)	printf("A%d",i);//当序列里只有一项的时候直接打出
	else
	{
		printf("(");//打出左括号
		PRINT_OPTIML_PARENS(i,s[i][j]);//打出分割点前的元素
		PRINT_OPTIML_PARENS(s[i][j]+1,j);//打出分割点后的元素
		printf(")");//打出右括号
	}
}

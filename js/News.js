const apiKey='d28fb0b0afeff9b749ea5e7f96866ad9';
const apiUrl =`https://gnews.io/api/v4/search?q=economy&lang=en&country=ko&max=10&apikey=${apiKey}`;



async function fetchNews(){
    try{
        const response=await fetch(apiUrl);
        const data= await response.json();

        const newsContainer=document.getElementById('news-container');
        newsContainer.innerHTML='';

        console.log(data);
        // 랜덤한 3개의 기사를 선택한다.
        const dataLength=data.articles.length;
        const num=Math.floor(Math.random()*dataLength);
        for(let i=0;i<3;i++){

            let new_num=num+i;
            if(new_num>=dataLength){
                new_num=new_num-dataLength;
            }
            console.log(new_num);
            const article=data.articles[new_num];
           
            const newsItem=document.createElement('div');
        
                newsItem.innerHTML=`
                <h3>${article.title}</h3>
                <p>${article.description || '내용 없음'}</p>
                <a href="${article.url}" target="_blank">전체 기사 읽기</a>
                `;
                newsContainer.appendChild(newsItem);
            }
        } 

        catch (error) 
        {
        console.error('뉴스를 불러오는 데 오류가 발생했습니다:', error);
        }
}
//기사중 3가지를 랜덤으로 추출해서 보여주는 코드를 짜보자!!!
//추가로 중복이 불가능하게 만든다....-->이건 어렵...


// 페이지 로드 시 뉴스 데이터 가져오기
fetchNews();


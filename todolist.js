// 获取添加按钮
var btn = document.querySelector('.btn')
// 获取输入框
var content = document.querySelector('.content')
// 获取tbody
var tbody = document.querySelector('tbody')
//定义标识
var flag = 1
//存储修改的是哪条信息
var targetFlag = 0

/*
    给添加按钮绑事件
 */
btn.onclick = function() {
    
    if(btn.value =="修改")
    { 
        //获取所有内容 tbody--》tr-->td里面的第一个td（存储内容的,用到伪类选择器）
        var tds = document.querySelectorAll('tbody tr td:nth-child(1)')
        for(var i=0;i<tds.length;i++){
            if(tds[i].getAttribute('index') == targetFlag){ //与循环到的索引值相等 就修改
                tds[i].innerText = content.value //--->修改的关键语句
                //修改完成的善后处理
                content.value=''
                btn.value="添加"
            }
        }
        return  
    }


    /*
        添加按钮绑事件
    */
    
    var text = content.value.trim(); // 去掉输入值的前后空格
    if(text.length!= 0)
    {
        console.log(text)
        // 创建元素td1 td2
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        td1.setAttribute("index",flag)
        flag++
        td1.innerText = text
        var td2 = document.createElement('td')
        td2.innerHTML = '<input type="button" value="完成" class="finish"><input type="button" value="删除" class="delete"><input type="button" value="修改" class="update"></input>'
        tr.append(td1)
        tr.append(td2)
        tbody.append(tr)
        content.value=''
    
        // console.log('td1')
        // console.log('td2')
        // console.log('tr')

    }
    else{
        alert("请输入信息！！！")
    }

    /*
        给完成按钮绑事件,这里注意要写到添加按钮里面，可以实时获取最新的事件,同理其他按钮也是这样
    */
    var finish = document.getElementsByClassName('finish')
    //循环给每一个按钮绑事件
    for(var i = 0;i<finish.length;i++)
    {
        finish[i].onclick = function() { //触发事件时才执行
            var target = this.parentNode.previousElementSibling
            if(target.style.textDecoration == 'line-through')
            {
                target.style.textDecoration = 'none'
                target.style.color= '#000'
                this.value = "完成"
                this.style.borderColor = '#910000'
                this.style.color='#910000'

            }
            else
            {
                target.style.textDecoration = 'line-through'
                target.style.color= '#888'
                this.value = "恢复"
                this.style.borderColor = '#888'
                this.style.color='#888'
            }
        }
    }

    /*
         获取删除按钮
     */
    var deleteBtn = document.getElementsByClassName('delete')
    //循环绑事件
    for(var i = 0;i < deleteBtn.length;i++)
    {
        deleteBtn[i].onclick =function(){
            if(this.parentNode.previousElementSibling.style.textDecoration=="line-through")
            {
                // 删除整行，找到tbody--删除tr
                if(confirm("确定要删除吗？")){    //用户点击确定时就会返回true 
                    var target = this.parentNode.parentNode
                    tbody.removeChild(target)
                }
            }else{
                alert("努力完成吧ヾ(◍°∇°◍)ﾉﾞ")
            }
            
        }
    }


    /*
        获取修改按钮--回写:让内容重新回到输入框，进行修改
     */
    var update = document.getElementsByClassName('update')
    //循环绑事件
    for(var i=0;i<update.length;i++)
    {
        update[i].onclick = function(){
            //找到td--》td
           var target = this.parentNode.previousElementSibling
           if(target.style.textDecoration=="line-through")
           {
                //事项已经完成无需修改
                alert("已经完成啦无需修改~~")
                btn.value="添加" //这里需要在最外层循环进行判断，否则会是无脑的执行添加操作
           }else{
                content.value = target.innerText    
                btn.value="修改"
                targetFlag = target.getAttribute("index")
           }
           
        }
    }

}
console.log(btn) 


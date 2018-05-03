// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头。
class Title extends Component {
    

    handleClickOnTitle (word,e) {
        console.log(this,word,'Click on title.',e.target.innerHTML,e);
    }

    render () {
        let styles = {  
            color: 'blue',  
            fontSize: '30'  
        }  
        
        // <h1 onClick={this.handleClickOnTitle} style={{cursor:'pointer'}}>全家桶</h1>
        // <h1 onClick={this.handleClickOnTitle.bind(this)} style={{cursor:'pointer'}}>全家桶</h1>
        return (
            <div>
            <h1 onClick={this.handleClickOnTitle.bind(this,'Hello')} style={{cursor:'pointer'}}>全家桶</h1>
            <h1 style={styles}>styles</h1>
            </div>
        )
    }
}

class Header extends Component {
  render () {
    return (
      <div>
        <Title />
        <h2>This is Header</h2>
      </div>
    )
  }
}

//<LikeButton likedText='已赞' unlikedText='赞'/>
class Main extends Component {
    constructor () {
        super()
        this.state = {
            likedText: '已赞',
            unlikedText: '赞'
        }
    }

    handleClickOnChange () {
        console.log('修改wording',this.state)
        this.setState({
            likedText: '取消',
            unlikedText: '点赞'
        })
    }

    render () {
        return (
            <div>
                <h2>This is main content</h2>
                <LikeButton wordings={{likedText: '已赞', unlikedText: '赞'}}
                            onClick={() => console.log('Click on like button!')} />
                <LikeButton
                    likedText={this.state.likedText}
                    unlikedText={this.state.unlikedText} />
                <div>
                    <button onClick={this.handleClickOnChange.bind(this)}>
                        修改 wordings
                    </button>
                </div>
            </div>
        )
    }
}

class Footer extends Component {
    render () {
        return (
            <div>
                <h2>This is Footer</h2>
            </div>
        )
    }
}

class LikeButton extends Component {
    //默认配置 defaultProps
    // static defaultProps = {
    //     likedText: '取消',
    //     unlikedText: '点赞'
    // }

    constructor () {
        super()
        this.state = {isLiked: false}
    }

    handleClickOnLikeButton () {
        //console.log(this.state.isLiked)
        this.setState({
            isLiked: !this.state.isLiked
        })
        if(this.props.onClick) {
            this.props.onClick()
        }
        //console.log(this.state.isLiked)

        // this.setState((prevState) => {
        //     return { count: 0 }
        // }) 
        // this.setState((prevState) => {
        //     return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
        // })
        // this.setState((prevState) => {
        //     return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
        // })
        // 最后的结果是 this.state.count 为 3

    }

    render () {
         const likedText = this.props.likedText || '取消'
         const unlikedText = this.props.unlikedText || '点赞'
        // <button onClick={this.handleClickOnLikeButton.bind(this)}>
        //     {this.state.isLiked ? wordings.likedText : wordings.unlikedText}👍
        // </button>
        const wordings = this.props.wordings || {
            likedText: '取消',
            unlikedText: '点赞'
        }
        return (
            <button onClick={this.handleClickOnLikeButton.bind(this)}>
                {this.state.isLiked ? likedText : unlikedText}👍
            </button>
        )
    }
}

class Index extends Component {
    render () {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
                <Computer />
                <LessonList lessons={lessons} />             
            </div>
        )
    }
}




class Computer extends Component {
    constructor() {
        super()
        this.state = { status: 'off' }
    }

    handleSetComputerOnOff() {
        this.setState({
            status: this.state.status == 'off'?'on':'off'
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleSetComputerOnOff.bind(this)}>开关</button>
                <Screen showContent={this.state.status =='off'? '显示器关了':'显示器亮了'}/>
            </div>
        )
    }
}

class Screen extends Component {
    static defaultProps = {showContent:'无内容'}
    render() {
        return (
            <div className='screen' >{this.props.showContent}</div>
        )
    }
}


const lessons = [
    { title: 'Lesson 1: title', description: 'Lesson 1: description' },
    { title: 'Lesson 2: title', description: 'Lesson 2: description' },
    { title: 'Lesson 3: title', description: 'Lesson 3: description' },
    { title: 'Lesson 4: title', description: 'Lesson 4: description' }
  ]

class Lesson extends Component {

    render () {
        const {lessonItem} = this.props
        return (
            <div onClick={()=>console.log(`${this.props.index} - ${lessonItem.title}`)}>
                <h1>{lessonItem.title}</h1>
                <div>{lessonItem.description}</div>
            </div>
        )
    }
}

class LessonList extends Component {
    render () {
        return (
            <div>{this.props.lessons.map((lessonItem, i) => {
                return <Lesson key={i} index={i} lessonItem={lessonItem} />
            })}</div>
        )
    }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
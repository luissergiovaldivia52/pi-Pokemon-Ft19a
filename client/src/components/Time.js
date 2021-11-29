import React from "react";

export default class Timer extends React.Component{

                constructor(props){
                    super(props);
                    this.state = {
                        counter: props.val
                    }
                }

                render(){

                            let x = this;
                            let {counter} = this.state;

                            let timer = setTimeout(
                                function(){
                                    if (counter > 0) {
                                        x.setState({ counter: counter -1});
                                        
                                    }
                                }, 1000
                            );
                                        return (this.state.counter)


                }
}
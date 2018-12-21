import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(){
    super()
    this.state = {
      frontFace: true
    }
  }

  handleCardClick = () => {
    this.setState({frontFace: !this.state.frontFace})
  }

  
  findHP = (props) => {
    let hp = this.props.pokemon.stats.find(
      stat => stat.name === "hp"
    )
    return hp.value
  }

  render() {

    return (
      <Card onClick={this.handleCardClick}>
        <div>
          <div className="image">
            <img src={this.state.frontFace ? this.props.pokemon.sprites.front : this.props.pokemon.sprites.back} />
          </div>
          <div className="content">
            <div className="header">{(this.props.pokemon.name).charAt(0).toUpperCase() + this.props.pokemon.name.slice(1)}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
             {this.findHP()} 
              
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard


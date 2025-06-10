import * as React from 'react';
import { Appbar} from 'react-native-paper';

const Header= ({title, goBack}) => {
 

  return ( 
    <Appbar.Header style={{ backgroundColor: '#00d2ff' }}>
    { goBack && <Appbar.BackAction onPress={goBack}/>
    }
     
      <Appbar.Content title="TechParts" />
      
      
    </Appbar.Header>
    
    
  );
};




export default Header;


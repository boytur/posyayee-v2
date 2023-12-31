const userToken = sessionStorage.getItem("userToken");
const roleToken = sessionStorage.getItem("roleToken"); 

const config = {
  headers: {
    'Authorization': userToken ? `Bearer ${userToken.replace(/"/g, '')}` : '',
    'RoleAuthorization': roleToken ? `Bearer ${roleToken.replace(/"/g, '')}` : '' 
  },
};

export { config };

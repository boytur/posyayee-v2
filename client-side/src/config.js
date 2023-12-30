const userToken = sessionStorage.getItem("userToken");
const roleToken = sessionStorage.getItem("roleToken");

const config = {
  headers: {
    'Authorization': userToken ? `Bearer ${userToken}` : '',
    'RoleAuthorization': roleToken ? `Bearer ${roleToken}` : ''
  },
};

export { config };

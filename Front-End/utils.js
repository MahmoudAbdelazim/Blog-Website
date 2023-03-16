export const isSignedIn = () => {
  return (
    typeof window != 'undefined' && localStorage["token"] != null && localStorage["token"] != ""
  );
};
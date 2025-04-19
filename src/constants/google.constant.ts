interface GGC{
    webClientId:string,
    iosClientId:string,
    scopes: string[]
}
export const googleCredi:GGC = {
  webClientId:
    "451751220501-mf5sf5nba5jltkn1fjjhq518kv4j2i0i.apps.googleusercontent.com", // Lấy từ Google Cloud Console (Web)
  iosClientId:
    "451751220501-2qg4k41pomebd5gfr4cpkdjb5fnd3p39.apps.googleusercontent.com", // Lấy từ Google Cloud Console (iOS)
  scopes: ["openid email profile"],
};

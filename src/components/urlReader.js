
export default function urlReader() {

    return (document.location.href.split("/")[0]+"//"+document.location.href.split("/")[2])

}
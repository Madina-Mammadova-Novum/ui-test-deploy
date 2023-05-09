import { MapPropTypes } from "@/lib/types";

const Map = ({ title, embedMap }) => {
    const src = embedMap.match(/src="([^"]+)"/)[1];
    return (
        <iframe
            title={title}
            src={src}
            width="536"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-base w-full h-[400px]"
        />
    )
}

Map.propTypes = MapPropTypes;


export default Map;
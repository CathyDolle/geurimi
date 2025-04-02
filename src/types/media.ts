export enum MediaTypeEnum {
	image = 'image',
	video = 'video',
}

export type MediaType = `${MediaTypeEnum}`;

/** Object whose key is the max viewport width and the value is the url of the video for that screen size (see VideoLoop component) */
export type MediaVideoSrcs = { [key: string]: string };

export interface GenericMedia {
	id: string;
	type: MediaType;
}

export interface MediaImage extends GenericMedia {
	type: MediaTypeEnum.image;
	src: string;
}

export interface MediaVideo extends GenericMedia {
	type: MediaTypeEnum.video;
	srcs: MediaVideoSrcs;
	poster: string;
}

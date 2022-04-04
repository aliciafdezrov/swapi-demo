import {
    mapAlbumOrArtistItemApiToCatalogItem,
    mapApiCatalogToCatalog,
    mapTrackItemApiToCatalogItem
} from "./catalog.mapper";
import {createInitialCatalog} from "./catalog.vm";

describe('Catalog mapper', () => {
    it('should return an empty Catalog when feeding empty data', () => {
        const searchCatalogApiModel = {
            albums: {items: []},
            artists: {items: []},
            tracks: {items: []},
        };

        const result = mapApiCatalogToCatalog(searchCatalogApiModel);
        expect(result).toEqual(createInitialCatalog());
    });

    it('should return an empty artist without image when images prop is null', () => {
        const catalogItemApiModel = {
            id: 'id',
            name: 'name',
            images: null,
            type: 'artist'
        };

        const result = mapAlbumOrArtistItemApiToCatalogItem(catalogItemApiModel);
        expect(result.id).toEqual('id');
        expect(result.name).toEqual('name');
        expect(result.image.url).toEqual('');
        expect(result.image.width).toEqual(0);
        expect(result.image.height).toEqual(0);
    });

    it('should return an empty artist without image when images prop is an empty array', () => {
        const catalogItemApiModel = {
            id: 'id',
            name: 'name',
            images: [],
            type: 'artist'
        };

        const result = mapAlbumOrArtistItemApiToCatalogItem(catalogItemApiModel);
        expect(result.id).toEqual('id');
        expect(result.name).toEqual('name');
        expect(result.image.url).toEqual('');
        expect(result.image.width).toEqual(0);
        expect(result.image.height).toEqual(0);
    });

    it('should return an empty track without image when album prop is null', () => {
        const catalogItemApiModel = {
            id: 'id',
            name: 'name',
            album: null,
            type: 'artist'
        };

        const result = mapTrackItemApiToCatalogItem(catalogItemApiModel);
        expect(result.id).toEqual('id');
        expect(result.name).toEqual('name');
        expect(result.image.url).toEqual('');
        expect(result.image.width).toEqual(0);
        expect(result.image.height).toEqual(0);
    });

    it('should return an empty track without image when album images prop is an empty array', () => {
        const catalogItemApiModel = {
            id: 'id',
            name: 'name',
            album: {images: [], id: 'album-id', name: 'album-name', type: 'album'},
            type: 'artist'
        };

        const result = mapTrackItemApiToCatalogItem(catalogItemApiModel);
        expect(result.id).toEqual('id');
        expect(result.name).toEqual('name');
        expect(result.image.url).toEqual('');
        expect(result.image.width).toEqual(0);
        expect(result.image.height).toEqual(0);
    });

    it('should return an empty track without image when album images prop is null', () => {
        const catalogItemApiModel = {
            id: 'id',
            name: 'name',
            album: {images: null, id: 'album-id', name: 'album-name', type: 'album'},
            type: 'artist'
        };

        const result = mapTrackItemApiToCatalogItem(catalogItemApiModel);
        expect(result.id).toEqual('id');
        expect(result.name).toEqual('name');
        expect(result.image.url).toEqual('');
        expect(result.image.width).toEqual(0);
        expect(result.image.height).toEqual(0);
    });

    it('should return an empty track without image with the image from the album', () => {
        const catalogItemApiModel = {
            id: 'id',
            name: 'name',
            album: {
                images: [{url: '', height: 0, width: 0}, {url: 'album-url', height: 300, width: 300}],
                id: 'album-id',
                name: 'album-name',
                type: 'album'
            },
            type: 'artist'
        };

        const result = mapTrackItemApiToCatalogItem(catalogItemApiModel);
        expect(result.id).toEqual('id');
        expect(result.name).toEqual('name');
        expect(result.image.url).toEqual('album-url');
        expect(result.image.width).toEqual(300);
        expect(result.image.height).toEqual(300);
    });
});

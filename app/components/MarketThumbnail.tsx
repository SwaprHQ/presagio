'use client';

import { useQuery } from '@tanstack/react-query';
import Image, { ImageProps } from 'next/image';
import { OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL } from '@/constants';
import { byte32ToIPFSCIDV0 } from '@/utils';
import request from 'graphql-request';

interface MarketThumbnailProps extends Omit<ImageProps, 'src' | 'alt'> {
  marketId: string;
  alt?: string;
}

type OmenThumbnailMapping = { omenThumbnailMapping: { image_hash: string } };

export const MarketThumbnail = ({ marketId, ...props }: MarketThumbnailProps) => {
  const { data: thumbnailData } = useQuery({
    queryKey: ['getThumbnail', marketId],
    queryFn: async () => {
      if (!!marketId)
        return request<OmenThumbnailMapping>(
          OMEN_THUMBNAIL_MAPPING_SUBGRAPH_URL,
          `query GetOmenThumbnail($id: ID){
            omenThumbnailMapping(id: $id) {
              image_hash
            }
          }`,
          { id: marketId }
        );
    },
    staleTime: Infinity,
    enabled: !!marketId,
  });

  const ipfsHash = thumbnailData?.omenThumbnailMapping?.image_hash
    ? byte32ToIPFSCIDV0(thumbnailData.omenThumbnailMapping.image_hash.slice(2))
    : null;

  if (!ipfsHash) return null;
  return (
    <Image src={`https://ipfs.io/ipfs/${ipfsHash}`} alt="Thumbnail image" {...props} />
  );
};

import { NextRequest, NextResponse } from 'next/server';
import {
  getAllVideosForAdmin,
  createVideoForAdmin,
  validateShortId,
} from '@/lib/admin';

/**
 * GET /api/admin/videos
 * Returns all videos (requires admin authentication)
 */
export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    );
  }

  const videos = getAllVideosForAdmin();
  return NextResponse.json({
    success: true,
    data: videos,
  });
}

/**
 * POST /api/admin/videos
 * Creates a new video (requires admin authentication)
 *
 * Expects tags to be a string array in the request body.
 */
export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { shortId, ...videoData } = body;

    // Normalize tags: ensure it is a string array
    if (videoData.tags && !Array.isArray(videoData.tags)) {
      if (typeof videoData.tags === 'string') {
        videoData.tags = videoData.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0);
      } else {
        videoData.tags = [];
      }
    }

    // Validate short ID if provided
    if (shortId) {
      const validation = validateShortId(shortId);
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            message: validation.errors.join(' '),
          },
          { status: 400 }
        );
      }
    }

    const video = createVideoForAdmin(videoData, shortId);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create video. Please check your input.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Video created successfully.',
      data: video,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request.',
      },
      { status: 400 }
    );
  }
}

/**
 * Check if the request is from an authenticated admin
 */
function isAdminAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get('vidnesia_admin_session');

  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }

  const token = sessionCookie.value;
  const validPattern = /^[a-z0-9_]+$/i;
  return validPattern.test(token);
}
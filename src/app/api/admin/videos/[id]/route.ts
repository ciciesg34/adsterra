import { NextRequest, NextResponse } from 'next/server';
import {
  getVideoByIdForAdmin,
  updateVideoForAdmin,
  deleteVideoForAdmin,
  validateShortId,
} from '@/lib/admin';

/**
 * GET /api/admin/videos/[id]
 * Returns a single video by ID (requires admin authentication)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    );
  }

  const video = getVideoByIdForAdmin(params.id);

  if (!video) {
    return NextResponse.json(
      { success: false, message: 'Video not found.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: video,
  });
}

/**
 * PUT /api/admin/videos/[id]
 * Updates a video by ID (requires admin authentication)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { shortId, ...updates } = body;

    // If short ID is being changed, validate it
    if (shortId && shortId !== params.id) {
      const validation = validateShortId(shortId, params.id);
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            message: validation.errors.join(' '),
          },
          { status: 400 }
        );
      }
      updates.id = shortId;
    }

    const video = updateVideoForAdmin(params.id, updates);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to update video.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Video updated successfully.',
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
 * DELETE /api/admin/videos/[id]
 * Deletes a video by ID (requires admin authentication)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    );
  }

  const deleted = deleteVideoForAdmin(params.id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, message: 'Video not found.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Video deleted successfully.',
  });
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
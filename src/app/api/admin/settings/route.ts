import { NextRequest, NextResponse } from 'next/server';
import { getSettingsForAdmin, updateSettingsForAdmin } from '@/lib/admin';

/**
 * GET /api/admin/settings
 * Returns site settings (requires admin authentication)
 */
export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    );
  }

  const settings = getSettingsForAdmin();
  return NextResponse.json({
    success: true,
    data: settings,
  });
}

/**
 * PUT /api/admin/settings
 * Updates site settings (requires admin authentication)
 */
export async function PUT(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const updatedSettings = updateSettingsForAdmin(body);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully.',
      data: updatedSettings,
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
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials } from '@/lib/auth';

/**
 * POST /api/admin/login
 * Authenticates admin credentials and returns a session token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const result = validateAdminCredentials({ username, password });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      token: result.token,
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